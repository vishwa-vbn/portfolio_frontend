import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css';

const Dashboard = () => {

 
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isSkillDeleteConfirmationOpen, setIsSkillDeleteConfirmationOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [deleteSkillId, setDeleteSkillId] = useState(null);
  const [isReviewDeleteConfirmationOpen, setIsReviewDeleteConfirmationOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    } else {
      setUserEmail(localStorage.getItem('userEmail'));

    }
  
  }, [navigate]);



  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getProjects`);
      const projectsWithImages = response.data.map((project) => ({
        ...project,
        imageUrl: URL.createObjectURL(new Blob([new Uint8Array(project.logo.data)], { type: 'image/jpeg' })),
      }));
      setProjects(projectsWithImages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getReviews`);
      setReviews(response.data.reviews);
      setLoadingReviews(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoadingReviews(false);
    }
  };



  useEffect(() => {
    fetchProjects();
    fetchReviews();
  }, []);



  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      if (!userEmail) {
        navigate('/login');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      setIsLoading(false);
    }
  }, [userEmail]);

  const openDeleteConfirmation = (projectId) => {
    setIsDeleteConfirmationOpen(true);
    setDeleteProjectId(projectId);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteProjectId(null);
  };

  const openSkillDeleteConfirmation = (skillId) => {
    setIsSkillDeleteConfirmationOpen(true);
    setDeleteSkillId(skillId);
  };

  const closeSkillDeleteConfirmation = () => {
    setIsSkillDeleteConfirmationOpen(false);
    setDeleteSkillId(null);
  };

  const openReviewDeleteConfirmation = (reviewId) => {
    setIsReviewDeleteConfirmationOpen(true);
    setDeleteReviewId(reviewId);
  };

  const closeReviewDeleteConfirmation = () => {
    setIsReviewDeleteConfirmationOpen(false);
    setDeleteReviewId(null);
  };

  const deleteProject = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteProject/${deleteProjectId}`);

      if (response.status === 200) {
        const updatedProjects = projects.filter((project) => project._id !== deleteProjectId);
        setProjects(updatedProjects);

        closeDeleteConfirmation();
      } else {
        console.error('Error deleting project:', response.data);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSkills`);
        const skillsWithImages = response.data.map((skill) => ({
          ...skill,
          imageUrl: URL.createObjectURL(new Blob([new Uint8Array(skill.icon.data)], { type: 'image/jpeg' })),
        }));
        setSkills(skillsWithImages);
        setLoadingSkills(false);
      } catch (error) {
        setError(error);
        setLoadingSkills(false);
      }
    };

    fetchSkills();

    return () => {
      skills.forEach((skill) => URL.revokeObjectURL(skill.imageUrl));
    };
  }, [skills]);

  const deleteSkill = async () => {
    if (deleteSkillId) {
      console.log('Deleting skill with ID:', deleteSkillId);
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteSkill/${deleteSkillId}`);
  
        if (response.status === 200) {
          const updatedSkills = skills.filter((skill) => skill._id !== deleteSkillId);
          setSkills(updatedSkills);
        } else {
          console.error('Error deleting skill:', response.data);
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
  
      closeSkillDeleteConfirmation();
    }
  };

  const deleteReview = async () => {
    if (deleteReviewId) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteReview/${deleteReviewId}`);
  
        if (response.status === 200) {
          const updatedReviews = reviews.filter((review) => review._id !== deleteReviewId);
          setReviews(updatedReviews);
        } else {
          console.error('Error deleting review:', response.data);
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
  
      closeReviewDeleteConfirmation();
    }
  };
  

  window.onbeforeunload = function() {
    localStorage.clear();
  }
  
  return (
   
    <div className="dashboard-container">
      {isLoading ? (
        <p>Loading...</p>
      ) :userEmail? (
        <>
          <h1>Welcome Back!</h1>
          <p>{userEmail}</p>
          <div className="button-container">
            <Link to="/upSkill">
              <button className="dashboard-button">
                <FontAwesomeIcon icon={faPlus} /> Upload Skill
              </button>
            </Link>
            <Link to="/upProject">
              <button className="dashboard-button">
                <FontAwesomeIcon icon={faPlus} /> Upload Project
              </button>
            </Link>
          </div>
          <h2>Uploaded Projects</h2>

<table>
  <thead>
    <tr>
      <th>Logo</th>
      <th>Category</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {projects.map((project) => (
      <tr key={project._id}>
        <td>
          <img className="table-logo" src={project.imageUrl} alt="logo-img" />
        </td>
        <td>{project.category}</td>
        <td>{project.description.slice(0, 50)}...</td>
        <td>
          <button onClick={() => openDeleteConfirmation(project._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<h2>Uploaded Skills</h2>

{loadingSkills ? (
  <p>Loading skills...</p>
) : error ? (
  <p>Error: {error.message}</p>
) : (
  <table>
    <thead>
      <tr>
        <th>Icon</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {skills.map((skill) => (
      <tr key={skill._id}>
        <td>
          <img className="table-logo" src={skill.imageUrl} alt="Skill Icon" />
        </td>
        <td>{skill.name}</td>
        <td>
          <button onClick={() => openSkillDeleteConfirmation(skill._id)}>Delete</button>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
)}

<h2>Uploaded Reviews</h2>

{loadingReviews ? (
  <p>Loading reviews...</p>
) : (
  <table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Review</th>
        <th>Stars</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {reviews.map((review) => (
        <tr key={review._id}>
          <td>{review.name}</td>
          <td>{review.text.slice(0, 50)}...</td>
          <td>{review.rating}</td>
          <td>
            <button onClick={() => openReviewDeleteConfirmation(review._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{isDeleteConfirmationOpen && (
  <div className="delete-confirmation-modal">
    <p>Are you sure you want to delete this project?</p>
    <button onClick={deleteProject}>Yes</button>
    <button onClick={closeDeleteConfirmation}>No</button>
  </div>
)}

{isSkillDeleteConfirmationOpen && (
  <div className="delete-confirmation-modal">
    <p>Are you sure you want to delete this skill?</p>
    <button onClick={deleteSkill}>Yes</button>
    <button onClick={closeSkillDeleteConfirmation}>No</button>
  </div>
)}

{isReviewDeleteConfirmationOpen && (
  <div className="delete-confirmation-modal">
    <p>Are you sure you want to delete this Review?</p>
    <button onClick={deleteReview}>Yes</button>
    <button onClick={closeReviewDeleteConfirmation}>No</button>
  </div>
)}


        </>
      ) : (
        <p>Invalid admin credentials. Please log in with admin credentials.</p>
      )}

</div>
      );
};

export default Dashboard;
