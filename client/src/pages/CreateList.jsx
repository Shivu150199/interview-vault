import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'

const CreateList = () => {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log(formData)
  const handleUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promise = []
      for (let i = 0; i < files.length; i++) {
        promise.push(storeImage(files[i]))
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
        })
        // setUploading(false)
    } else {
      setUploading(false)
      setImageUploadError('you can only upload 6 images per listing')
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`upload is on progress ${progress}`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }
  // console.log(files)
  return (
    <main className="p-4 bg-zinc-800 ">
      <h2 className="text-3xl font-bold capitalize text-center text-white ">
        create List
      </h2>

      <form className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 my-4 md:p-10">
          <input
            name="name"
            type="text"
            required
            max={269}
            placeholder="Name"
            className="p-2 rounded border-none outline-none "
          />

          <textarea
            required
            name="description"
            type="text"
            placeholder="description"
            className="p-2 rounded border-none outline-none  resize-none capitalize"
          />

          <input
            required
            name="address"
            type="text"
            placeholder="address"
            className="p-2 rounded border-none outline-none  capitalize"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required name="sale" />
              <span className="text-white">sell</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required name="discountPrice" id="rent" />
              <span className="text-white">rent</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required name="parking" />
              <span className="text-white">parking spot </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white" name="furnished">
                furnished
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required name="offer" />
              <span className="text-white">offer</span>
            </div>
          </div>
          <div className="flex items-center gap-10 my-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bedrooms"
                className="w-14 h-10 rounded"
                min="1"
                required
              />
              <span className="text-white capitalize">beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="w-14 h-10 rounded"
                min="1"
                required
                name="bathrooms"
              />
              <span className="text-white capitalize">baths</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="number"
              className="w-20 h-12 rounded"
              required
              id="regular-price"
              min={1}
              max={10}
              name="regularPrice"
            />
            <div>
              <p className="text-white text-xl font-semibold">Regular price </p>
              <p className="text-white">$/month</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              className="w-20 h-12 rounded"
              required
              id="discount-price"
              min={1}
              max={10}
              name="discountPrice"
            />
            <div>
              <p className="text-white text-xl font-semibold">
                Discounted price{' '}
              </p>
              <p className="text-white">$/month</p>
            </div>
          </div>
        </div>

        <div className="md:p-10">
          <label className="text-white">
            <span className="font-bold text-xl ">Images</span> first images will
            be on cover and max 6{' '}
          </label>
          <div className="flex gap-4 mt-2">
            <div className="bg-white rounded flex items-center px-2 ">
              <input
                type="file"
                className="w-100 border-none outline-none "
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
            <button
              type="button"
              disabled={uploading}
              onClick={handleUpload}
              className="btn bg-indigo-700 border-none hover:bg-indigo-500 text-white"
            >
              {uploading ? 'uploading...' : 'upload'}
            </button>
          </div>

          <p className="text-red-700">{imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              return (
                <div
                  className="flex justify-between items-center gap-4"
                  key={index}
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-700 btn text-white hover:bg-red-800"
                  >
                    DELETE
                  </button>
                </div>
              )
            })}

          <button className="btn btn-primary bg-indigo-800 mt-4 w-100 ">
            Create list
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateList
