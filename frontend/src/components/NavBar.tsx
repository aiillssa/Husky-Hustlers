import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarStyle.css";
import { handleSignOut } from "../utils/axios";

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/pages/Homepage" className="nav-button">
          Homepage
        </Link>
        <Link to="/pages/BusinessPage" className="nav-button">
          My Business
        </Link>
        <Link to="/" className="nav-button" onClick={handleSignOut}>
          Log Out
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
