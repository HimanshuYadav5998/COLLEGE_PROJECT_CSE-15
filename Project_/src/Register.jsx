import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Register() {
  // This hook allows us to change pages via JavaScript
  const navigate = useNavigate();

  return (
    <div className="register-container">
      {/* Top Bar */}
      <div className="register-header">
        <h1 className="logo">NETFLIX</h1>
        {/* Clicking this moves the user to your movie page */}
        <button className="sign-in-btn" onClick={() => navigate('/browse')}>
          Sign In
        </button>
      </div>

      {/* Main Center Content */}
      <div className="register-content">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        
        <div className="email-form">
          <input type="email" placeholder="Email address" />
          <button className="get-started-btn" onClick={() => navigate('/browse')}>
            Get Started {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;