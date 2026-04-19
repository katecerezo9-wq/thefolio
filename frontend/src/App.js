import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import AdminPage from './pages/AdminPage';
import AdminMessages from './pages/AdminMessages';
import './App.css';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') || 'dark';
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine which home page to show
  const HomeComponent = () => {
    if (!user) return <Home />;
    return <HomePage />;
  };

  // Show loading screen while loading
  if (loading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="page-container">
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
              <>
                <li>
                  <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                    About
                  </NavLink>
                </li>
                {user.role !== 'admin' && (
                  <li>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                      Contact
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create-post" className={({ isActive }) => isActive ? 'active' : ''}>
                    Create Post
                  </NavLink>
                </li>
                {user.role === 'admin' && (
                  <>
                    <li>
                      <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                        Admin
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}>
                        Messages
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handleLogout} className="logout-btn-nav">Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<PostPage />} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute role="admin">
              <AdminMessages />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <footer className="main-footer">
        <p>Contact: katecerezo9@gmail.com | La Union, Philippines</p>
        <p>&copy; 2025 Kate Ann Cerezo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;