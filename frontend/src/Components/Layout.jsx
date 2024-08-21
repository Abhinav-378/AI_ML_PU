import React from 'react'
import NavBar from './Header/NavBar'
import { Outlet } from 'react-router-dom'
import Navbar from './Header/NavBar'

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}


export default Layout
