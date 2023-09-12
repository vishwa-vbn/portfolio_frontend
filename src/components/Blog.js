import React, { useState, useEffect } from 'react';
import '../blog.css';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import rlogo from '../review-logo.jpg';
import { TailSpin } from 'react-loader-spinner';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getreviews`);
        if (response.data && Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          console.error("Error: Invalid response data format");
        }
      } catch (error) {
        console.error("Error occurred while fetching:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchReviews();
  }, []);


  const renderReview = (review, index) => (
    <div className="review-box" key={index}>
      <FontAwesomeIcon className="left-qote" icon={faQuoteLeft} />
      <q>{review.text}</q>
      <p className="author">- {review.name}</p>
      <ReactStars
        count={5}
        size={30}
        activeColor="rgb(255, 115, 92)"
        value={review.rating}
        disabled
      />
      <FontAwesomeIcon className="Right-qote" icon={faQuoteRight} />
    </div>
  );

  const navigateToAddReview = () => {
    window.location.href = '/review';
  };

  return (
    <div className="testimonials-container">
      <div className="logo-box">
        <h2 className="title7">What My Clients Say</h2>
        <img src={rlogo} alt="review-logo" className="rv-logo" />
      </div>

      <div className="Review-container">
        {loading ? (
          <div className='loader-container'>
          <TailSpin color="#D3D3D3" margin ={100} height={100} width={80} /> 
          </div>
        ) : reviews.length > 0 ? (
          reviews.map(renderReview)
        ) : (
          <div className="no-reviews">
            <p>No reviews yet.</p>
            <button className="add-review-button" onClick={navigateToAddReview}>
              <FontAwesomeIcon icon={faPlus} /> Add Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
