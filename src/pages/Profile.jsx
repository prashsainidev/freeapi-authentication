import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null; // Protected route handles the redirect

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <div className="brand-logo" style={{ marginBottom: 0 }}>
          <span className="logo-accent">AURA</span> AUTH
        </div>
        <button onClick={handleLogout} className="outline-btn">
          Sign Out
        </button>
      </nav>

      <main className="profile-content">
        <div className="welcome-hero">
          <img 
            src={
              user.avatar?.url && !user.avatar.url.includes('via.placeholder.com') 
                ? user.avatar.url 
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
            } 
            alt="Avatar" 
            className="profile-avatar" 
            onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`; }}
          />
          <div className="hero-text">
            <h1>Welcome, <span className="logo-accent">{user.username}</span>.</h1>
            <p>Your session is active and secure. Here is your profile overview.</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="detail-card">
            <div className="detail-icon" style={{ width: '24px', height: '24px', color: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="detail-info">
              <label>Username</label>
              <p>@{user.username}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon" style={{ width: '24px', height: '24px', color: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="detail-info">
              <label>Email Address</label>
              <div className="info-value-group">
                <p className="value-text">{user.email}</p>
                {user.isEmailVerified !== undefined && (
                  <span className={`status-badge ${user.isEmailVerified ? 'verified' : 'unverified'}`}>
                    {user.isEmailVerified ? '✓ Verified' : '⚠ Unverified'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon" style={{ width: '24px', height: '24px', color: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="detail-info">
              <label>Account Role</label>
              <div className="info-value-group">
                <span className="role-badge">{user.role || 'USER'}</span>
                {user.loginType && (
                  <span className="role-badge outline-badge">
                    {user.loginType.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon" style={{ width: '24px', height: '24px', color: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="detail-info">
              <label>Member Since</label>
              <p>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
