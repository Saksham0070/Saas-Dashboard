import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    skillset: "",
    certificates: "",
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (name === "photo") {
      setPreviewPhoto(URL.createObjectURL(file));
      setUserData({ ...userData, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (userData.photo) {
      formData.append("photo", userData.photo);
    }
    formData.append("skillset", userData.skillset);
    formData.append("certificates", userData.certificates); // Certificates as comma-separated values

    try {
      const response = await fetch("http://localhost:5000/api/updateProfile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <div className="settings-container" style={{marginLeft:"500px",marginTop:"20px"}}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Photo:
          <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
        </label>
        {previewPhoto && <img src={previewPhoto} alt="Preview" className="photo-preview" />}
        <label>
          Skillset:
          <textarea
            name="skillset"
            value={userData.skillset}
            onChange={handleInputChange}
            placeholder="Enter your skills, separated by commas"
          />
        </label>
        <label>
          Certificates:
          <textarea
            name="certificates"
            value={userData.certificates}
            onChange={handleInputChange}
            placeholder="Enter your certificates, separated by commas"
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    </div>
  );
};

export default Settings;