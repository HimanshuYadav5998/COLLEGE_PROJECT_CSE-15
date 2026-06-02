import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

export default function Password({ setUser, logActivity }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) navigate('/login');
  }, [email, navigate]);

  const getStoredUser = () => {
    const rawUser = localStorage.getItem('netflix_account') || localStorage.getItem('netflix_user');
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setErrors('');
    if (!password.trim()) {
      setErrors('Please enter your password.');
      return;
    }

    const storedUser = getStoredUser();
    if (!storedUser || storedUser.email !== email) {
      setErrors('No account found for that email.');
      return;
    }

    const ok = storedUser.password ? storedUser.password === password : true;
    if (!ok) {
      setErrors('Incorrect password.');
      return;
    }

    setUser(storedUser);
    localStorage.setItem('netflix_user', JSON.stringify(storedUser));
    logActivity('User Signed In', `Signed in: ${storedUser.email}`);
    navigate('/', { replace: true });
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="logo">NETFLIX</h1>
      </div>

      <div className="register-content">
        <h1>Welcome back.</h1>
        <h2>Enter your password to continue.</h2>
        <p>{email}</p>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button type="submit" className="get-started-btn">Sign In {'>'}</button>
        </form>

        {errors && <div className="login-error">{errors}</div>}
      </div>
    </div>
  );
}
