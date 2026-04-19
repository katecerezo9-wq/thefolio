import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ mode, toggleMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo">Kate<span>Ann</span></div>
        <div className="mode-toggle">
          <button className="mode-toggle-btn" onClick={toggleMode}>
            <span className="mode-icon">{mode === 'light' ? '🌙' : '☀️'}</span>
            <span className="mode-text">{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          
          {!user ? (
            // GUEST - hindi naka-login
            <>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            // LOGGED IN USERS
            <>
              {/* Regular user navigation */}
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-post" className={({ isActive }) => isActive ? 'active' : ''}>
                  Create Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                  Profile
                </NavLink>
              </li>
              
              {/* Admin only - extra links */}
              {user.role === 'admin' && (
                <li>
                  <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                    Admin
                  </NavLink>
                </li>
              )}
              
              <li>
                <button onClick={handleLogout} className="logout-btn-nav">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;