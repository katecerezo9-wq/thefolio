import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo">Kate<span>Ann</span></div>
        <div className="mode-toggle">
          <button className="mode-toggle-btn" onClick={toggleTheme}>
            <span className="mode-icon">{isLightMode ? '🌙' : '☀️'}</span>
            <span className="mode-text">
              {isLightMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
        </div>
      </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;