import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the login request to your API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Store the token in local storage
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userEmail', email);

        // Redirect to the dashboard screen
        navigate('/dashboard'); // Replace 'dashboard' with your actual dashboard route
      } else {
        const data = await response.json();
        alert('Login Failed', data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      alert('Error', 'An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email-log'>Email:</label>
          <input
          id="email-log"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
          id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className='loginbtn' type="submit">Login</button>
        </div>

      </form>
    </div>
  );
};

export default Login;
