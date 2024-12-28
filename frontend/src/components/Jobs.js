import React from 'react';
import "../components/common/Job_card.css";
import Job_card from './common/Job_card';

const Jobs = () => {

  return (
    <div className="jobs-container"style={{display:"flex",justifyContent: "space-between"}} >
      <Job_card />
    </div>
  );
};

export default Jobs;
