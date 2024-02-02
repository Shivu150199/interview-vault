import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />

        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<PrivateRoute />}>

        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
