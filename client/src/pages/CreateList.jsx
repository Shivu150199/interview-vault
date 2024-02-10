import React from 'react'

const CreateList = () => {
  return (
    <main className="p-4 bg-zinc-800 ">
      <h2 className="text-3xl font-bold capitalize text-center text-white ">
        create List
      </h2>

      <form className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 my-4 md:p-10">
          <input
            type="text"
            required
            max={269}
            placeholder="Name"
            className="p-2 rounded border-none outline-none "
          />

          <textarea
            required
            type="text"
            placeholder="description"
            className="p-2 rounded border-none outline-none  resize-none capitalize"
          />

          <input
            required
            type="text"
            placeholder="address"
            className="p-2 rounded border-none outline-none  capitalize"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white">sell</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white">rent</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white">parking spot </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white">furnished</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" required />
              <span className="text-white">offer</span>
            </div>
          </div>
          <div className="flex items-center gap-10 my-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
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
              <input type="file" className="w-100 border-none outline-none " id='images' accept='image/*' multiple />
            </div>
            <button className="btn bg-indigo-700 border-none hover:bg-indigo-500 text-white">
              Upload
            </button>
          </div>
          <button className="btn btn-primary bg-indigo-800 mt-4 w-100 ">
            Create list
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateList
