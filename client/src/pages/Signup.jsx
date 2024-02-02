import  { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
 const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     setLoading(true)

     const res = await fetch(
       '/api/auth/signup',
       {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
         },
         body: JSON.stringify(formData),
       }
     )
     const data = await res.json()
     // console.log(data)
     if (data.success === false) {
       setLoading(false)
       setError(data.message)
       return;
     }
     setLoading(false)
     setError(null)
     navigate('/login')
   } catch (error) {
     // console.log(error)
     setLoading(false)
     setError(error.message)
   }
 }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  console.log(formData)
  return (
    <section className="p-4 w-screen h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center my-6 text-white ">
        Sign Up
      </h1>
      <form
        className="flex flex-col gap-4 bg-zinc-800 shadow-2xl border-t-8 border-indigo-800 border-b-8 p-6 rounded-2xl  w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-indigo-800 font-bold text-3xl text-center ">
          Job Vault
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-2 bg-transparent border-none text-white focus:outline-none"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-2 bg-transparent border-none text-white focus:outline-none"
          id="email"
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
          disabled={loading}
          className="bg-indigo-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'loading....' : 'sign up'}
        </button>
        <OAuth/>
        <div className="flex gap-2 text-white items-center justify-center ">
          <p>Have an account ?</p>
          <Link to={'/login'}>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </section>
  )
}

export default Signup
