import React, { useState } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <nav className='navbar'>
        <h3 className='logo'>Logo</h3>
        
        <ul className={"nav-links"}>
          <Link to='./pages/LoginPage' className='login'>
            <li>LoginPage</li>
          </Link>
          <Link to='./pages/Homepage' className='homepage'>
            <li>Homepage</li>
          </Link>
          <Link to='./pages/Profile' className='profile'>
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
    </>
  )
}
export default Navbar