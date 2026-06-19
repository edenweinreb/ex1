import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";

function Header({ currentUser, onLogout }) {
  // Manage search input state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  
  // Manage application theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newMode;
    });
  };

  // Wrapper function to handle logout state clear and navigation
  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/'); 
  };

  return (
    <nav className="navbar" >
      
      {/* 1. Logo */}
      <h2><Link to="/" className="navbar-logo">MyWolt</Link></h2>

      {/* 2. Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          ref={searchInputRef} 
          value={searchQuery} 
          onChange={handleSearchChange} 
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants..." 
        />
        <button className="btn-search" onClick={handleSearchSubmit}>Search</button>
      </div>

      {/* 3. User Controls & Theme */}
      <div className="user-controls">
        <button className="btn-theme" onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>


        {/* Conditional Rendering: Check if user is logged in */}
        {currentUser ? (
          <div className="profile-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* 1. Order History Link */}
            <Link to="/history" className="btn-history" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
              Order History
            </Link>

            {/* 2. Profile Picture */}
            {currentUser.profilePic ? (
              <img src={currentUser.profilePic} alt="Profile" className="profile-pic" style={{ marginLeft: '10px' }} />
            ) : (
              <div className="profile-placeholder" style={{ marginLeft: '10px' }}>
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            
            {/* 3. User Name */}
            <span className="user-name" style={{ marginRight: '5px' }}>
              {currentUser.name || currentUser.displayName}
            </span>
            
            {/* 4. Logout Button */}
            <button onClick={handleLogoutClick} className="btn-logout" style={{ marginLeft: '15px' }}>Logout</button>
            
          </div>
        ) : (
          <div className="profile-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* Guest Greeting */}
            <span className="user-name" style={{ fontWeight: 'bold', color: 'var(--wolt-text-dark)' }}>
              Hello, Guest
            </span>

            <Link to="/login" className="btn-login-link">Login</Link>
            <Link to="/register" className="btn-register-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;