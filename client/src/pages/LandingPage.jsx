import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <section className="w-screen bg-zinc-800 px-10 py-8">
      <div className="flex items-center gap-4">
        <span className="btn font-bold text-white bg-indigo-800 text-3xl border-none shadow capitalize">
          J
        </span>
        <span className="text-white font-semibold text-2xl tracking-wider">
          Job Vault
        </span>
      </div>
      <div className='grid lg:grid-cols-2'>
        <div className='p-4 my-8'>
          <img src="src/assets/landingPage.svg" alt="landing page" />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h2 className="text-5xl tracking-wider font-bold text-white text-center my-4 ">
            Job Vault <span className="text-indigo-800">App</span>
          </h2>
          <p className="text-white text-xl tracking-wide text-center my-6">
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal
          </p>
          <div className="flex gap-4 items-center justify-center">
            <Link
              to="/signup"
              className="btn bg-indigo-800 border-none text-white hover:bg-indigo-600"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn bg-indigo-800 border-none text-white hover:bg-indigo-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 

export default LandingPage



