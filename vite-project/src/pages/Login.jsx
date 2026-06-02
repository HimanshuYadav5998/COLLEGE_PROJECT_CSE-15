import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ setUser, logActivity }) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const getStoredAccount = () => {
    const rawUser = localStorage.getItem('netflix_account') || localStorage.getItem('netflix_user');
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');

    if (!email.trim()) {
      setErrors('Please enter your email address.');
      return;
    }

    const storedAccount = getStoredAccount();

    if (!storedAccount || storedAccount.email !== email.trim()) {
      setErrors('Email not found. Please register first.');
      return;
    }

    navigate('/password', { state: { email: email.trim() }, replace: true });
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="logo">NETFLIX</h1>
        <button className="sign-in-btn" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>

      <div className="register-content">
        <h1>Welcome back.</h1>
        <h2>Sign in to continue watching.</h2>
        <p>Enter your email to access your subscription.</p>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit" className="get-started-btn">
            Next {'>'}
          </button>
        </form>

        {errors && <div className="login-error">{errors}</div>}
      </div>
    </div>
  );
}
