import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import CircularProgress from "@mui/joy/CircularProgress";
import DateCalendarReferenceDate from "./calender/DateCalendarReferenceDate";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // photo_url = "uploads/1734772153539-479090429-Screenshot (8).png";
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("The token in client =", token);
    if (!token) {
      // If no token, redirect to login
      navigate("/login");
    } else {
      // Fetch dashboard data using token
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/getDashboard",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Send token as Authorization header
              },
            }
          );
          const json = await response.json();
          if (json.success) {
            setDashboardData(json.data); // Set the fetched data
          } else {
            setError("Failed to fetch dashboard data");
          }
        } catch (err) {
          console.log(err);
          setError("An error occurred");
        }
      };

      fetchData();
    }
  }, [navigate]);

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <div className="dashboard-container">
      <h1>My Dashboard</h1>
      {error && <div className="error">{error}</div>}
      {dashboardData ? (
        <div className="main-container">
          <div className="dashboard-content">
            <div className="photo-container">
              {dashboardData.photo ? (
                <img
                  src={dashboardData.photo}
                  alt="Profile Pic"
                  className="profile-photo"
                />
              ) : (
                <p>No photo available</p>
              )}
            </div>
            <div className="name-spec">
              <h2>Welcome back, {dashboardData.userName}!</h2>
              <p style={{ color: "#828181" }}>
                "{dashboardData.specialisation || "N/A"}"
              </p>
            </div>
            <div className="numeric-continer">
              <div className="num-data">
                <div className="small-numeric">
                  <strong style={{ color: "#1d9dd9" }}>8.2</strong>
                  <div style={{ color: "#828181" }}>Overall</div>
                  <div style={{ color: "#828181" }}>Rating</div>
                </div>
              </div>
              <div className="num-data">
                <div className="small-numeric">
                  <strong style={{ color: "#1d9dd9" }}>75%</strong>
                  <div style={{ color: "#828181" }}>Completed</div>
                  <div style={{ color: "#828181" }}>Projects</div>
                </div>
              </div>
              <div className="num-data">
                <div className="small-numeric">
                  <strong style={{ color: "#1d9dd9" }}>10</strong>
                  <div style={{ color: "#828181" }}>Proficient</div>
                  <div style={{ color: "#828181" }}>Skills</div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="numeric-continer">
              <div className="num-data">
                <div className="small-numeric">
                  <div>AI/ML</div>
                  <strong
                    style={{
                      backgroundColor: "#1d9dd9",
                      color: "#fff",
                      padding: "4px",
                      borderRadius: "10px",
                    }}
                  >
                    4 Days Left
                  </strong>
                </div>
              </div>
              <div className="num-data">
                <div className="small-numeric">
                  <div>UI/UX</div>
                  <strong
                    style={{
                      backgroundColor: "#1d9dd9",
                      color: "#fff",
                      padding: "4px",
                      borderRadius: "10px",
                    }}
                  >
                    2 Days Left
                  </strong>
                </div>
              </div>
            </div>
            {/* <p><strong>Role:</strong> {dashboardData.role}</p> */}
          </div>

          <div className="dashboard-content" style={{paddingRight:"50px",paddingLeft:"50px"}}>
            <div className="numeric-continer" style={{paddingRight:"30px",paddingLeft:"30px"}}>
              <div className="small-numeric">
                <div
                  style={{
                    color: "#828181",
                    marginBottom: "5px",
                    padding: "10px",
                  }}
                >
                  Skill Set
                </div>

                {dashboardData.skillSet.length > 0 ? (
                  dashboardData.skillSet.map((skill) => (
                    <div key={skill} className="skill">
                      <div className="skill-info">
                        <span>{skill}</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `150px`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>
            <br></br>
            <div
              className="numeric-continer"
              style={{ backgroundColor: "#fff" }}
            >
              <p>
                <div
                  style={{
                    color: "#828181",
                    marginBottom: "5px",
                    padding: "10px",
                  }}
                >
                  Certification
                </div>
                {/* <div className="numeric-continer" style={{padding:"5px",backgroundColor:"#e2dede"}}> */}
                {dashboardData.certification.length > 0
                  ? dashboardData.certification.map((certificate) => (
                      <div
                        className="numeric-continer"
                        style={{
                          padding: "5px",
                          backgroundColor: "#f9f9f9",
                          margin: "10px",
                        }}
                      >
                        {certificate} ⭐⭐⭐⭐
                      </div>
                    ))
                  : "N/A"}
                {/* </div> */}
              </p>
            </div>
          </div>
          <div className="dashboard-content">
            <div style={{display:"flex",flexDirection:"row"}}>
              <div className="numeric-continer small-numeric" style={{margin:"8px",padding:"15px"}}>
                <CircularProgress size="lg" determinate value={62} sx={{ '--CircularProgress-size': '50px' }}>
                  62
                </CircularProgress>
                <div style={{display:"flex",flexDirection:"row",padding:"10px"}}>
                  <div style={{marginRight:"5px"}}>Cyber</div>
                  <span>{ " "}</span>
                  <div>Security</div>
                </div>
                <div style={{fontSize:"10px",color:"#828181"}}>2.00pm-4.00pm</div>
              </div>
              <div className="numeric-continer small-numeric"style={{margin:"10px",padding:"15px"}} >
                <CircularProgress size="lg" determinate value={40} sx={{ '--CircularProgress-size': '50px' }}>
                  40
                </CircularProgress>
                <div style={{display:"flex",flexDirection:"row",padding:"10px"}}>
                  <div style={{marginRight:"5px"}}>UX</div>
                  <span>{ " "}</span>
                  <div>Research</div>
                </div>
                <div style={{fontSize:"10px",color:"#828181"}}>2.00pm-4.00pm</div>
              </div>
            </div>
            <DateCalendarReferenceDate />
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
