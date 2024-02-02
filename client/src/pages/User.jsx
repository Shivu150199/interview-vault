import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const User = () => {
const[formData,setFromData]=useState({})
const [error,setError]=useState(null)
const [loading,setLoading]=useState(false)
const navigate=useNavigate()
const handleSubmit=async(e)=>{
e.preventDefault();
setLoading(true)
try{
const res = await fetch('http://localhost:3000/api/app/user', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(formData),
})
const data=await res.json();
console.log(data)
 if (data.success === false) {
   setLoading(false)
   setError(data.message)
   return
 }
setLoading(false)
setError(null)
navigate('/')
}catch(error){
  setLoading(false)
setError(error.message)
}

}
const handleChange=(e)=>{
  setFromData({
    ...formData,
[e.target.id]:e.target.value
  })
}
  return (
    <section className="bg-slate-100 w-screen h-screen flex items-center justify-center">
      <form
        className="flex-col flex bg-slate-300 p-8 rounded shadow-2xl min-w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-bold">Form</h2>
        <div className="flex flex-col mb-2">
          <label htmlFor="category" className="mb-2 font-semibold">
            Choose a category
          </label>
          <select
            name="category"
            id="category"
            className="p-1 rounded outline-none"
            onChange={handleChange}
          >
            <option value="select" disabled>
              Select an option
            </option>
            <option value="food">food</option>
            <option value="ride">Ride</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="item" className="mb-2 font-semibold">
            Choose an item
          </label>
          <select
            name="item"
            id="item"
            className="p-1 rounded outline-none "
            onChange={handleChange}
          >
            <option value="select" disabled>
              select an option
            </option>
            <option value="noodles">noodles</option>
            <option value="manchurian">manchurian</option>
            <option value="bike">bike</option>
            <option value="honda city">honda city</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="time" className="mb-2 font-semibold">
            Time
          </label>
          <select
            name="time"
            id="time"
            className="p-1 rounded outline-none "
            onChange={handleChange}
          >
            <option value="select" disabled>
              select an option
            </option>
            <option value="6:00 pm">6:00 pm</option>
            <option value="8:00 pm">8:00 pm</option>
            <option value="10:00 pm">10:00 pm</option>
            <option value="12:00 pm">12:00 am</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="fare" className="mb-2 font-semibold">
            Fare
          </label>
          <input
            id="fare"
            name="fare"
            type="number"
            className="p-1 rounded outline-none "
            placeholder="Enter fare"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn bg-slate-600 p-4 text-white">
          Submit
        </button>
      </form>
    </section>
  )
}

export default User
