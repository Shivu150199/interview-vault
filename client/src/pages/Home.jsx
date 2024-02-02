import React from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <section className="bg-zinc-800 w-screen h-screen">
      <div className="drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}

          <div className="navbar bg-zinc-800 pt-6 px-6">
            <div className="flex-1">
              <label
                htmlFor="my-drawer"
                className="btn text-3xl bg-transparent text-white   drawer-button"
              >
                <CgMenuRight />
              </label>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input  w-24 md:w-auto bg-transparent text-white border-stone-200 outline-slate-200"
                />
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                    {currentUser ? (
                  <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={currentUser.avatar}
                        />
                        </div>
                    ):
                    <Link to='/login' className='btn bg-indigo-800'>Sign in</Link>
                    }
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to='/profile' className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                 
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className=" p-4 w-60 min-h-full bg-zinc-800 text-base-content">
            {/* Sidebar content here */}
            <div className="flex items-center gap-4">
              <span className="btn font-bold text-white bg-indigo-800 text-3xl border-none shadow capitalize">
                J
              </span>
              <span className="text-white font-semibold text-2xl tracking-wider">
                Jobster
              </span>
            </div>
            <ul>
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav></nav>
    </section>
  )
}

export default Home
