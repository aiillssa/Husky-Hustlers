import React, { useState } from "react"
import { Link } from "react-router-dom"
import './NavBarStyle.css';

const Navbar = () => {
  return (
    <>
    <nav>
        <Link to='/pages/LoginPage' className='nav-button'>
            Login
        </Link>
        <Link to='/pages/Homepage' className='nav-button'>
            Homepage
        </Link>
        <Link to='/pages/Profile' className='nav-button'>
            Profile
        </Link>
    </nav>
    </>
);
}
export default Navbar