import React, { useCallback, useEffect, useState, useContext } from 'react';
import { myContext } from '../App';
import axios from 'axios';
import ProjectPage from './projectPopup';
import work from '../give_me_work.jpg';
import './projects.css'; 
import { TailSpin } from 'react-loader-spinner';

const LoadingPlaceholder = () => (
  <div className="loading-box"></div>
);

const Projects = () => {
  const windowResized = useContext(myContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [category, setCategory] = useState('personal');
  const [loadingProjects, setLoadingProjects] = useState(true); 

  const openPopup = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const closePopup = () => {
    setSelectedProject(null);
    setShowProjectDetails(false);
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoadingProjects(true); 
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getProjects`);
      const projectsWithImages = await Promise.all(response.data.map(async (project) => {
        const imageUrl = URL.createObjectURL(new Blob([new Uint8Array(project.logo.data)], { type: 'image/jpeg' }));
        return { ...project, imageUrl };
      }));
      setProjects(projectsWithImages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProjects(false); 
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const noOfficialProjectsComponent = (
    <div className="no-projects-container">
      <div className="no-projects">
        <img src={work} alt="No Projects" />
        <p>Nahh, I don't have any work done. Give me a work!</p>
      </div>
    </div>
  );

  const filteredProjects = projects.filter((project) => {
    if (category === 'personal') {
      return project.category === 'Personal';
    } else if (category === 'official') {
      return project.category === 'Official';
    }
    return true;
  });

  return (
    <div className="projects-page">
      {showProjectDetails ? (
        <ProjectPage project={selectedProject} onClose={closePopup} />
      ) : (
        <>
          <div className="category-buttons">
            <button className={`link_btn ${category === 'personal' ? 'active' : ''}`} onClick={() => setCategory('personal')}>
              Personal Work
            </button>
            <div className='slash'>/</div>
            <button className={`link_btn ${category === 'official' ? 'active' : ''}`} onClick={() => setCategory('official')}>
              Official Works
            </button>
          </div>
          <div className={`projects-container ${windowResized ? 'Active' : ''}`}>
            {loadingProjects ? (
              <div className="projects-grid">
                <TailSpin color="#D3D3D3" margin ={100} height={100} width={100} /> 
              </div>
            ) : filteredProjects.length === 0 && category === 'official' ? (
              noOfficialProjectsComponent
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                  <div className="project" key={index} onClick={() => openPopup(project)}>
                    <img src={project.imageUrl} alt={`Project ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
