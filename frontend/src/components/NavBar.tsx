import React, { useState } from "react"
import { Link } from "react-router-dom"
import './NavBarStyle.css';

const Navbar = () => {
  return (
    <>
    <nav>
        <Link to='/pages/Homepage' className='nav-button'>
            Homepage
        </Link>
        <Link to='/pages/Profile' className='nav-button'>
            Profile
        </Link>
        <Link to='/pages/BusinessPages' className='nav-button'>
            My Business
        </Link>
    </nav>
    </>
);
}
export default Navbar