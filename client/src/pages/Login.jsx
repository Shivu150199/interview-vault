import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
 signInFailure,signInStart,signInSuccess
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
const Login = () => {
  const [formData, SetFormData] = useState({})
  
  
  const navigate = useNavigate()
  // console.log(data)
const dispatch=useDispatch();
const {loading,error}=useSelector((state)=>state.user)
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      // setLoading(true)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      // console.log(data)
      if (data.success === false) {
        // dispatch(signInFailure(data.message))
        // setLoading(false)
        // setError(data.message)
        dispatch(signInFailure())
        return;
      }
      dispatch(signInSuccess(data))
// setLoading(false)
// setError(null)

      navigate('/home')
    } catch (error) {
      dispatch(signInFailure('hi my name is shivam'))
      console.log(error)
      // setLoading(false)
      // setError(error.message)
    }
  }
 const handleChange = (e) => {
   SetFormData({
     ...formData,
     [e.target.id]: e.target.value,
   })
 }
  return (
    <section className="p-4 w-screen h-screen bg-zinc-800 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center my-6 text-white ">
        Sign In
      </h1>
      <form
        className="flex flex-col gap-4 bg-zinc-800 shadow-2xl border-t-8 border-indigo-800 p-6 rounded-2xl  w-80 border-b-8 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-indigo-800 font-bold text-3xl text-center ">
          Job Vault
        </h2>
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
          {loading ? 'loading....' : 'sign in'}
        </button>
        <OAuth/>
        <div className="flex gap-2 my-1 text-white justify-center">
          <p>Do not have an account ?</p>
          <Link to={'/signup'}>
            <span className="text-blue-700">Register</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </section>
  )
}

export default Login
