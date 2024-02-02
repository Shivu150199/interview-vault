import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      })
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      type="button"
      className="bg-indigo-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      onClick={handleGoogleClick}
    >Sign in with google</button>
  )
}

export default OAuth
