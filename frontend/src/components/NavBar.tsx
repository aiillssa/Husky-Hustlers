import React, { useState } from "react"
// import "./navbar.css"   NavBtn,
import { Link } from "react-router-dom"
import {
  Nav,
  Bars,
  NavMenu,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
        <Nav>
            <Bars />

            <NavMenu>
                <NavBtnLink to='/pages/LoginPage/LoginPage' className='login'>
                    Login
                </NavBtnLink>
                <NavBtnLink to='/pages/Homepage/Homepage' className='homepage'>
                    Homepage
                </NavBtnLink>
                <NavBtnLink to='/pages/Profile' className='profile'>
                    Profile
                </NavBtnLink>
            </NavMenu>
        </Nav>
    </>
);
}
export default Navbar