import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure CSS styling matches the design requirements

const Login = () => {
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Directly send the credentials state
    });

    const json = await response.json();

    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.userEmail);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChangeEvent = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className='main-containers'>
    <div className="login-main-container" >
      <div className="login-container">
        <div className="login-card">
          {/* <div className="icon"></div> */}
          <h2 className="text-center text-light">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="userEmail" // Corrected name
                value={credentials.userEmail}
                onChange={onChangeEvent}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="userPassword" // Corrected name
                value={credentials.userPassword}
                onChange={onChangeEvent}
                required
              />
            </div>
            <div className="form-group form-check d-flex justify-content-between">
              <div>
                <input className="form-check-input" type="checkbox" /> Remember me
              </div>
              <Link to="#">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <Link to="/createuser" className="btn btn-secondary w-100 mt-3">New User</Link>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
