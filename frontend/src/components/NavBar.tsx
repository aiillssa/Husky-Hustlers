import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyle.css";

import { handleSignOut } from "../utils/axios";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="logoWrapper">
          <img src="/assets/defaultLogo.png" alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <Link to="/pages/Homepage" className="nav-button">
            Homepage
          </Link>
          <Link to="/pages/BusinessPage" className="nav-button">
            My Business
          </Link>
          <Link to="/" className="nav-button" onClick={handleSignOut}>
            Log Out
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
