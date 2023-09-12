import React, { useState, useCallback } from 'react';
import '../Review.css';
import ReactStars from 'react-rating-stars-component';

const Review = () => {
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reviewerName,
          review: reviewText,
          Rating: rating,
        }),
      });

      if (response.ok) {
        setReviewText('');
        setReviewerName('');
        setRating(0);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', 'Internal server error');
    }
  }, [reviewerName, reviewText, rating]);

  return (
    <div className="review-container">
      <h2> Please Write your feedback</h2>
      {!isSubmitted ? (
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <label htmlFor="revName">Name:</label>
          <input
            type="text"
            id="revName"
            className="reviewerName"
            value={reviewerName}
            onChange={(e) => {
              setReviewerName(e.target.value);
            }}
          ></input>
          <label htmlFor="revText">Write Review:</label>
          <textarea
            className="reviewText"
            id="revText"
            rows={6}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          ></textarea>
          <label htmlFor="stars">Overall Rating:</label>
          <ReactStars
            count={5}
            value={rating}
            size={30}
            activeColor="rgb(255, 115, 92)"
            onChange={(newRating) => {
              setRating(newRating);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="review-success">
          <h1>Thank you {reviewerName}</h1>
          <p>Your Review Submitted Successfully</p>
        </div>
      )}
    </div>
  );
};

export default Review;
