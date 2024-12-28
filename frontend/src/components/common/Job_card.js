import React from "react";
import { useEffect,useState } from "react";
import "../common/Job_card.css";

const Job_card = () => {

  const [jobs,setJobs] = useState([]);

  const fetch_jobs = async ()=>{
    try{
      const response = await fetch("http://localhost:5000/api/jobsInfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if(json.success){
          setJobs(json.data);
        }else{
          console.log("Failed to fetch jobs data");
        }
    }catch(err){
      console.log(err);
      console.log("Failed to fetch jobs");
    }
    
  }
  useEffect(()=>{
    fetch_jobs();
  },[])

  return (
    <div className="dashboard-container" style={{ display: "flex", justifyContent: "space-between",flexWrap: "wrap"}}>
      {jobs.map((job, index) => (
        <div className="dashboard-content" 
       key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <a href={job.link} className="job-link">
            View Details
          </a>
          <div className="apply-button" style={{marginTop:"10px"}}>
            <a href={job.apply} className="apply-link">
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Job_card;
