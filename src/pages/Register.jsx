import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData.username, formData.email, formData.password);
      // Optional: Add a success toast here
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="split-layout">
        
        {/* Left Side: Info Panel */}
        <div className="info-panel">
          <div className="brand-logo">
            <span className="logo-accent">AURA</span> AUTH
          </div>
          <h2>Join the Elite Network</h2>
          <p>Get access to a world-class authentication dashboard built with industry standards.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </span>
              <div className="feature-text">
                <h3>Bank-Grade Security</h3>
                <p>Fully encrypted sessions and JWT token management.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </span>
              <div className="feature-text">
                <h3>Zero Latency</h3>
                <p>Lightning fast client-side caching and route protection.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              <div className="feature-text">
                <h3>Premium Dashboard</h3>
                <p>Access your personalized, data-rich user profile.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="form-panel">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Start your secure journey today</p>
          </div>

          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. doejohn"
                required
                minLength="3"
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@domain.com"
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="test@123"
                required
                minLength="6"
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <div className="spinner-small"></div> : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="accent-link">Sign In here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
