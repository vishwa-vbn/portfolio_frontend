import { Link } from "react-router-dom";
import { useState } from "react";
import './login.css';

function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  const googleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-heading">{showLogin ? 'Sign in' : 'Sign Up'}</h2>
        <button className="google-btn" onClick={googleAuth}>
          <img src="google.png" alt="google icon" />
          <span>Sign in with Google</span>
        </button>
        <p className="text">
          Only for admin
       
        </p>
      </div>
    </div>
  );
}

export default Login;
