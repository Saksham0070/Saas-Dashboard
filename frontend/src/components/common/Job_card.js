import React, { useEffect, useState } from "react";
import "../common/Job_card.css";

const Job_card = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs

  const fetch_jobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobsInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success) {
        setJobs(json.data);
        setFilteredJobs(json.data); // Initially, all jobs are shown
      } else {
        console.log("Failed to fetch jobs data");
      }
    } catch (err) {
      console.log(err);
      console.log("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetch_jobs();
  }, []);

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      <div className="search-container" style={{ marginBottom: "20px",marginTop:"20px",alignItems:"center",justifyContent:"center",display:"flex"}}>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div
        className="dashboard-container-jobs"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {filteredJobs.map((job, index) => (
          <div className="dashboard-content-jobs" key={index}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <a href={job.link} className="job-link">
              View Details
            </a>
            <div className="apply-button" style={{ marginTop: "10px" }}>
              <a href={job.apply} className="apply-link">
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job_card;
