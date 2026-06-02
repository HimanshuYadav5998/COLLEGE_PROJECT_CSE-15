import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Register({ setUser, logActivity }) {
  const [stage, setStage] = useState('email');
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleStart = (e) => {
    e.preventDefault();
    setErrors('');

    if (!email.trim()) {
      setErrors('Please enter your email address.');
      return;
    }

    const storedAccount = getStoredAccount();
    const existingUser = storedAccount && storedAccount.email === email.trim();

    setIsLogin(existingUser);
    setStage('auth');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrors('');

    if (!password.trim()) {
      setErrors('Please enter your password.');
      return;
    }

    if (isLogin) {
      return handleLogin(e);
    }

    return handleRegister(e);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors('');

    if (!email.trim() || !password.trim()) {
      setErrors('Please enter both email and password.');
      return;
    }

    const storedAccount = getStoredAccount();

    if (!storedAccount || storedAccount.email !== email.trim()) {
      setErrors('Email not found or incorrect.');
      return;
    }

    const passwordOK = storedAccount.password ? storedAccount.password === password : true;
    if (!passwordOK) {
      setErrors('Incorrect password.');
      return;
    }

    setUser(storedAccount);
    localStorage.setItem('netflix_user', JSON.stringify(storedAccount));
    logActivity('User Signed In', `Signed in: ${storedAccount.email}`);
    navigate('/', { replace: true });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrors('');

    if (!email.trim() || !password.trim()) {
      setErrors('Please complete all fields.');
      return;
    }

    const userData = {
      email: email.trim(),
      password,
      subscriptionPrice: 149,
      lastActive: new Date().toISOString(),
    };

    localStorage.setItem('netflix_account', JSON.stringify(userData));
    localStorage.setItem('netflix_user', JSON.stringify(userData));
    setUser(userData);
    logActivity('User Registration', `Registered: ${userData.email}`);
    navigate('/', { replace: true });
  };

  const isEmailStage = stage === 'email';
  const authTitle = isLogin ? 'Welcome back.' : 'Create your membership.';
  const authSubtitle = isLogin ? 'Sign in to continue watching.' : 'Set your password to start streaming.';
  const authDescription = isLogin
    ? 'Enter your email and password to access your subscription.'
    : 'Choose a password to secure your account and begin watching now.';
  const authButtonLabel = isLogin ? 'Sign In' : 'Create Account';

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="logo">NETFLIX</h1>
      </div>

      <div className="register-content">
        {isEmailStage ? (
          <>
            <h1>
              Unlimited movies,
              <br />
              shows, and more.
            </h1>
            <h2>Starts at ₹149. Cancel at any time.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>

            <form className="email-form first-stage" onSubmit={handleStart}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="get-started-btn">
                Get Started {'>'}
              </button>
            </form>

            {errors && <div className="login-error">{errors}</div>}

            <p style={{ marginTop: '1.5rem', color: '#aaa' }}>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setStage('auth');
                  setErrors('');
                }}
                style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
              >
                Sign in here
              </button>
            </p>
          </>
        ) : (
          <>
            <h1>{authTitle}</h1>
            <h2>{authSubtitle}</h2>
            <p>{authDescription}</p>

            <form className="email-form" onSubmit={handleAuthSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                style={{ marginBottom: '1rem' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              {!isLogin && (
                <div style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '4px',
                  border: '1px solid #808080',
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#fff',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '10px'
                }}>
                  <span>Subscription</span>
                  <strong>₹149 / month</strong>
                </div>
              )}
              <button type="submit" className="get-started-btn">
                {authButtonLabel} {'>'}
              </button>
            </form>

            {errors && <div className="login-error">{errors}</div>}

            <p style={{ marginTop: '1.5rem', color: '#aaa' }}>
              Want to use a different email?{' '}
              <button
                onClick={() => {
                  setStage('email');
                  setPassword('');
                  setErrors('');
                }}
                style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
              >
                Start over
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

