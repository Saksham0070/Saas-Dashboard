import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    photo: null,
    role: "TEACHER", // Default value
    specialisation: "",
    skillSet: "",
    certification: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      const response = await axios.post("http://localhost:5000/api/createuser", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/"); // Redirect to home or another page
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="main-container-signup">
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Full Name"
          value={formData.userName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={formData.userEmail}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="userPassword"
          placeholder="Password"
          value={formData.userPassword}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="photo" onChange={handleFileChange} />
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        <input
          type="text"
          name="specialisation"
          placeholder="Specialisation"
          value={formData.specialisation}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="skillSet"
          placeholder="Skill Set (comma-separated)"
          value={formData.skillSet}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="certification"
          placeholder="Certifications (comma-separated)"
          value={formData.certification}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
