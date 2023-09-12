import React, { useState, useCallback, useEffect } from 'react';
import '../Frame.css';
import axios from 'axios';
import skilogo from '../skill-img.jpg';
import { TailSpin } from 'react-loader-spinner';

const Technologies = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSkills, setLoadingSkills] = useState(true); 

  const fetchSkills = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSkills`);
      const projectsWithImages = response.data.map((skill) => ({
        ...skill,
        imageUrl: null, 
      }));
      setSkills(projectsWithImages);
      setLoadingSkills(false); 
    } catch (error) {
      setError(error);
      setLoadingSkills(false); 
    }
  }, []);

  const loadImageUrl = useCallback(async (skill, index) => {
    try {
      const imageUrl = URL.createObjectURL(new Blob([new Uint8Array(skill.icon.data)], { type: 'image/jpeg' }));
      setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills];
        updatedSkills[index].imageUrl = imageUrl;
        return updatedSkills;
      });
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    skills.forEach((skill, index) => {
      if (!skill.imageUrl) {
        loadImageUrl(skill, index);
      }
    });
  }, [skills, loadImageUrl]);

  return (
    <div className="technologies-container">
      <div className="image-container">
        <img src={skilogo} alt="Coding" className="skill-image" />
        <div className="text-content">
          <h1 className="title8">What I know</h1>
          <p>
            I possess a diverse range of skills in both frontend and backend development. Some of the skills I specialize
            in include HTML, CSS, JavaScript, React, Node.js, and database management. These proficiencies enable me to
            effectively create and maintain robust web applications.
          </p>
        </div>
      </div>
      <div>
        {loadingSkills ? (
          <div className="projects-grid">
            <TailSpin color="#D3D3D3" margin={100} height={100} width={70} /> 
          </div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="technologies-list">
            {skills.map((skill, index) => (
              <div className="technology" key={index}>
                {skill.imageUrl ? (
                  <>
                    <img src={skill.imageUrl} alt={skill.name} className="technology-logo" />
                    <h3 className="technology-name">{skill.name}</h3>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Technologies;
