import React from "react";
import "./Sidebar.css"; // CSS file for styles
import dashboardIcon from "../assets/dashboard.png"; // Correct import for the image
import analytics from "../assets/analytics.png"; // Correct import for the image
import settings from "../assets/settings.png"; // Correct import for the image
import jobs from "../assets/jobs.png"; // Correct import for the image
import home from "../assets/home.png"; // Correct import for the image


const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="sidebar-company-name">Skill Tank</div>
        <a href="/" className="sidebar-link">
          <i className="far fa-user">
          <img src={home} alt="Home" className="sidebar-icon" />     
          </i>
        </a>
        <a href="/dashboard" className="sidebar-link">
          <i className="far fa-user">
          <img src={dashboardIcon} alt="Dashboard" className="sidebar-icon" />     
          </i>
        </a>
        <a href="/analytics" className="sidebar-link">
          <i className="fas fa-briefcase">
          <img src={analytics} alt="Analytics" className="sidebar-icon" />     
          </i>
        </a>
        <a href="/jobs" className="sidebar-link">
          <i className="far fa-file">
          <img src={jobs} alt="jobs" className="sidebar-icon" />     
          </i>
        </a>
        <a href="/settings" className="sidebar-link">
          <i className="far fa-address-card">
          <img src={settings} alt="settings" className="sidebar-icon" />     
          </i>
        </a>
      </nav>
      <div className="content">
        {/* <section id="first">
          <h1>First</h1>
        </section>
        <section id="second">
          <h1>Second</h1>
        </section>
        <section id="third">
          <h1>Third</h1>
        </section>
        <section id="fourth">
          <h1>Fourth</h1>
        </section> */}
      </div>
    </div>
  );
};

export default Sidebar;
