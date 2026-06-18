import React, { useState, useRef } from 'react';
import { Link} from 'react-router-dom';
import "./Header.css";

function Header({ currentUser, onLogout }) {
  // Manage search input state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  
  // Manage application theme state
  const [isDarkMode, setIsDarkMode] = useState(false);



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
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
          placeholder="Search restaurants..." 
        />
        <button className="btn-search" onClick={handleFocusSearch}>Search</button>
      </div>

      {/* 3. User Controls & Theme */}
      <div className="user-controls">
        <button className="btn-theme" onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>


        {/* Conditional Rendering: Check if user is logged in */}
        {currentUser ? (
          <div className="profile-section">
            {currentUser.profilePic ? (
              <img src={currentUser.profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <div className="profile-placeholder">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <span className="user-name">{currentUser.name || currentUser.displayName}</span>
            <button onClick={onLogout} className="btn-logout">Logout</button>
          </div>
        ) : (
          <div className="profile-section">
            <Link to="/login" className="btn-login-link">Login</Link>
            <Link to="/register" className="btn-register-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;