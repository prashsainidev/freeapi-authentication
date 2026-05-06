import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  // If already logged in, redirect to profile
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

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
    setSuccessMessage('');

    try {
      await login(formData.identifier, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Invalid username or password.');
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
          <h2>Welcome Back</h2>
          <p>Resume your session and access your secure dashboard.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                </svg>
              </span>
              <div className="feature-text">
                <h3>Secure Session</h3>
                <p>Your session is protected with robust JWT authentication.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20V10M18 20V4M6 20v-4"></path>
                </svg>
              </span>
              <div className="feature-text">
                <h3>Real-time Data</h3>
                <p>Access your user analytics seamlessly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="form-panel">
          <div className="auth-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to continue</p>
          </div>

          {successMessage && <div className="alert success">{successMessage}</div>}
          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Email or Username"
                required
              />
              <label htmlFor="identifier">Email or Username</label>
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
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? <div className="spinner-small"></div> : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="accent-link">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
