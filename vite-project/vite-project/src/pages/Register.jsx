import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Register({ setUser, logActivity }) {
  const [isLogin, setIsLogin] = useState(true);
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

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="logo">NETFLIX</h1>
      </div>

      <div className="register-content">
        {isLogin ? (
          <>
            <h1>Welcome back.</h1>
            <h2>Sign in to continue watching.</h2>
            <p>Enter your email and password to access your subscription.</p>

            <form className="email-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              <button type="submit" className="get-started-btn">
                Sign In {'>'}
              </button>
            </form>

            {errors && <div className="login-error">{errors}</div>}

            <p style={{ marginTop: '1.5rem', color: '#aaa' }}>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrors('');
                  setEmail('');
                  setPassword('');
                }}
                style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Create your membership now.</p>

            <form className="email-form" onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
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
                  setErrors('');
                  setEmail('');
                  setPassword('');
                }}
                style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
              >
                Sign in here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

