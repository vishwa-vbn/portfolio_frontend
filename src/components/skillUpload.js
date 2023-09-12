import React, { useState } from 'react';
import axios from 'axios';
import '../upskill.css';

const FormComponent = () => {
  const [name, setSkill] = useState('');
  const [icon, setIcon] = useState('');
  const [experience, setExperience] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('icon', icon);
      formData.append('experience', experience);
      formData.append('duration', duration);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploadSkill`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('New skill uploaded successfully');
        setSuccessMessage('Skill uploaded successfully'); 
        
        
        
        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);

      } else {
        console.log('Failed to upload skill');
        setSuccessMessage(null); 
      }
    } catch (error) {
      console.error('Some error occurred', error);
      setSuccessMessage(null); 
    }
  };

  return (
    <div>
      {successMessage && ( 
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form className="form-component" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="logo" className="form-label">
          Upload Logo:
        </label>
        <input
          type="file"
          id="logo"
          name="icon"
          className="form-input"
          onChange={(e) => setIcon(e.target.files[0])}
        />

        <label htmlFor="skill" className="form-label">
          Skill Name:
        </label>
        <input
          type="text"
          id="skill"
          className="form-input"
          value={name}
          onChange={(e) => setSkill(e.target.value)}
        />

        <label htmlFor="experience" className="form-label">
          Experience:
        </label>
        <input
          type="text"
          id="experience"
          className="form-input"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <label htmlFor="duration" className="form-label">
          Duration:
        </label>
        <input
          type="text"
          id="duration"
          className="form-input"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button type="submit" className="form-submit-button2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
