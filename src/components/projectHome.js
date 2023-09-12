import React from 'react';
import success from '../success.jpg';
import './projectHome.css';

const ProjectHome = () => {
  const handleViewProjects = () => {
    window.location.href = '/projects';
  };

  return (
    <div id="projects" className="project-home-container">
    <div className="project-home-content project-box">
      <h1 className="project-home-title">My Projects</h1>
      <p className="project-home-description">
        Discover a collection of my personal and professional projects showcasing my skills and expertise.
      </p>
      <button onClick={handleViewProjects} className="project-home-button">
        View Projects
      </button>
    </div>

    <div className="project-home-image project-box">
      <img src={success} alt="Success Logo" className="success-logo" />
    </div>
  </div>
  );
};

export default ProjectHome;

