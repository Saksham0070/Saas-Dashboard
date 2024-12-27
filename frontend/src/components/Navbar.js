import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // External CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="navbar-brand" to="/">
          Skill Tank
        </Link>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link className="navbar-button" to="/login">
              Login
            </Link>
            <Link className="navbar-button" to="/createuser">
              Signup
            </Link>
          </>
        ) : (
          <button className="navbar-button logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
