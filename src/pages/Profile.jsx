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
      <nav className="profile-nav glass-panel">
        <div className="brand-logo">
          <div className="logo-dot"></div>
          <span>AURA AUTH</span>
        </div>
        <button onClick={handleLogout} className="outline-btn">
          Sign Out
        </button>
      </nav>

      <main className="profile-content">
        <div className="welcome-banner glass-panel">
          <h1>Welcome, {user.username}!</h1>
          <p>Here are your authenticated session details.</p>
        </div>

        <div className="user-details-grid">
          <div className="detail-card glass-panel">
            <div className="detail-icon">👤</div>
            <div className="detail-info">
              <label>Username</label>
              <p>@{user.username}</p>
            </div>
          </div>

          <div className="detail-card glass-panel">
            <div className="detail-icon">📧</div>
            <div className="detail-info">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="detail-card glass-panel">
            <div className="detail-icon">🛡️</div>
            <div className="detail-info">
              <label>Account Role</label>
              <p className="role-badge">{user.role}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
