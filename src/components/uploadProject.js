import React, { useState } from 'react';
import './uploadProjects.css';
import axios from 'axios';

const UploadProjects = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    logo: null,
    uiuxImages: [],
    githubRepoLink: '',
    deployedLink: '',
  });

  const [successMessage, setSuccessMessage] = useState(null); 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogoChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: event.target.files[0],
    }));
  };

  const handleUiuxImagesChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      uiuxImages: event.target.files,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('logo', formData.logo);

      for (let i = 0; i < formData.uiuxImages.length; i++) {
        formDataToSend.append('uiuxImages', formData.uiuxImages[i]);
      }

      formDataToSend.append('githubRepoLink', formData.githubRepoLink);
      formDataToSend.append('deployedLink', formData.deployedLink);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploadProject`, formDataToSend);

      if (response.status === 200) {
        console.log('Project uploaded successfully');
        setSuccessMessage('Project uploaded successfully'); 
        setFormData({
          category: '',
          description: '',
          logo: null,
          uiuxImages: [],
          githubRepoLink: '',
          deployedLink: '',
        });
      }
    } catch (error) {
      console.error('Some error occurred', error);
      setSuccessMessage(null); 
    }
  };

  return (
    <>
      {successMessage && ( 
        <div className="success-message">
          {successMessage}
        </div>
      )}
    <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="">Select Category</option>
        <option value="Personal">Personal</option>
        <option value="Official">Official</option>
      </select>

      

      <label htmlFor="description">Project Description:</label>
      <input
        type="text"
        id="description"
        className="input-field"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <label htmlFor="logo">Logo Image:</label>
      <input
        type="file"
        id="logo"
        className="file-input"
        name="logo"
        onChange={handleLogoChange}
      />

      <label htmlFor="uiuxImages">UI/UX Images:</label>
      <input
        type="file"
        id="uiuxImages"
        className="file-input"
        multiple
        name="uiuxImages"
        onChange={handleUiuxImagesChange}
      />

      <label htmlFor="githubRepoLink">GitHub Repo Link:</label>
      <input
        type="text"
        id="githubRepoLink"
        className="input-field"
        name="githubRepoLink"
        value={formData.githubRepoLink}
        onChange={handleInputChange}
      />

      <label htmlFor="deployedLink">Deployed Link:</label>
      <input
        type="text"
        id="deployedLink"
        className="input-field"
        name="deployedLink"
        value={formData.deployedLink}
        onChange={handleInputChange}
      />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
    </>
  );
};

export default UploadProjects;
