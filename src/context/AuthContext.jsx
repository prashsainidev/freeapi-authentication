import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, logoutUser as apiLogout, getCurrentUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State on App Load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error('Failed to authenticate stored token:', error);
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);
      // Assuming FreeAPI returns the token in response.data.accessToken
      const { user, accessToken } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      setUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error on server, clearing local state anyway', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
