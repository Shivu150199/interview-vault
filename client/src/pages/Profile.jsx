import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

import { app } from '../firebase'
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutStart,
  signoutFailure,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from '../redux/user/userSlice'

import { Link, useNavigate } from 'react-router-dom'
const Profile = () => {
  const { currentUser, loading, error, handleSignOut } = useSelector(
    (state) => state.user
  )
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [showListingError, setShowListingError] = useState(false)
  const [showList, setShowList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(showList)
  // console.log(file)
  // console.log(filePerc)
  // console.log(formData)
  const handleChange = (e) => {
    // console.log('hello')
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(updateFailure(data.message))
        return
      }
      dispatch(updateSuccess(data))
      navigate('/home')
    } catch (error) {
      dispatch(updateFailure(error.message))
    }

    // console.log('submitted')
  }
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log(`upload is ${progress} % done`)
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl })
        })
      }
    )
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteStart())
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(deleteFailure(data.message))
        return
      }

      dispatch(deleteSuccess(data))
      navigate('/login')
    } catch (error) {
      dispatch(deleteFailure(error))
    }
  }

  const handleSignout = async () => {
    try {
      dispatch(signoutStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success == false) {
        dispatch(signoutFailure(data.message))
        return
      }
      dispatch(signoutSuccess(data))
      navigate('/login')
    } catch (error) {
      dispatch(signoutFailure(error.message))
    }
  }
  const handleShowListing = async (e) => {
    e.stopPropagation()
    try {
      setShowListingError(false)
      const res = await fetch(`/api/listing/listing/${currentUser._id}`)
      const data = await res.json()
      if (data.success == false) {
        setShowListingError(true)
        return
      }
      setShowList(data)
      setShowListingError(false)
    } catch (error) {
      setShowListingError(true)
      console.log(error)
    }
  }

const handleListEdit=()=>{

}
const handleListDelete=()=>{

}



  return (
    <section className="p-4 w-screen  bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center my-6 text-white ">
        Profile
      </h1>
      <form
        className="flex flex-col gap-4 bg-zinc-800 shadow-2xl border-t-8 border-indigo-800 border-b-8 p-6 rounded-2xl  w-80"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          style={{ width: '4rem', height: '4rem' }}
          className="rounded-full w-15 h-15 mx-auto"
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt=""
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">problem in upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-slate-700">Successfully uploaded</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-2 bg-transparent border-none text-white focus:outline-none"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-2 bg-transparent border-none text-white focus:outline-none"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-2 bg-transparent border-none text-white focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          //   disabled={loading}
          className="bg-indigo-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {/* Updated */}
          {loading ? 'loading....' : 'Update'}
        </button>
        <Link
          className="bg-indigo-700 text-white text-center p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          to="/create-list"
        >
          create list
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <button onClick={handleDelete} className="text-red-400 capitalize">
            delete Account
          </button>
          <button onClick={handleSignout} className="text-red-400 capitalize">
            Sign out
          </button>
        </div>
      </form>
      <button onClick={handleShowListing} className="text-green-700">
        Show listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? 'there is error ' : ' '}
      </p>
      {showList &&
        showList.length > 0 &&
        showList.map((item) => {
          const { imageUrls, name, _id } = item;
          return (
            <div
              key={_id}
              className="text-white flex items-center justify-between gap-6 p-2 mb-2 w-96"
            >
              <img src={imageUrls[0]} alt="hello" className="w-10 h-10 object-cover" />
              <Link to={`/listing/${_id}`}>
                <h3 className="capitalize font-bold ">{name}</h3>
              </Link>
              <div className="flex gap-2 items-center">
                <button onClick={handleListDelete} className="btn bg-indigo-700 border-none capitalize text-white">
                  delete
                </button>
                <button onClick={handleListEdit} class="btn bg-indigo-700 border-none text-white">edit</button>
              </div>
            </div>
          )
        })}
    </section>
  )
}

export default Profile
