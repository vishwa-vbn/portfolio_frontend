import React, { useState } from 'react';
import '../Contact.css';
import axios from 'axios';
import clogo from '../contact-logo.jpg';

const Contact = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        Query: query,
        email: email,
        contact: contactNumber,
      });
  
      console.log("Response from server:", response); 
  
      if (response.data && response.data.message === 'Contact details saved successfully') {
        setSuccessMessage('Message sent successfully!');
        setQuery('');
        setContactNumber('');
        setEmail('');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      } else {
        console.error('Failed to send the contact details');
      }
    } catch (error) {
      console.error('Error while submitting the contact details:', error);
    }
  };
  

  return (
    <div className="contact-container" id="contact">
      <div className="contact-box">
        <p className="wan_work">Interested in working together?</p>
        <img src={clogo} alt="contact-logo" className="c-logo"></img>
      </div>

      <h1 className='title5'>Contact</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="query">Query:</label>
        <textarea id="query" value={query} onChange={(e) => setQuery(e.target.value)} required></textarea>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <button type="submit" className='contact-btn1'>Ping me now</button>
      </form>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Contact;
