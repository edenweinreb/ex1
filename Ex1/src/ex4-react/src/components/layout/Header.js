import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";

function Header() {
  // Manage search input state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  
  // Manage application theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // MOCK USER STATE: Simulates a logged-in user. 
  // TODO: Replace this with real user data from context/JWT after successful login.
  const [user, setUser] = useState({
    isLoggedIn: true, // Change to 'false' to test the Logged-Out view
    displayName: "Student Developer",
    profilePic: "https://via.placeholder.com/40" // Placeholder image URL
  });

  const navigate = useNavigate();

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

  const handleLogout = () => {
    //Remove the token from storage to logout
    localStorage.removeItem('token');
    //Reset the mock global user state
    setUser({ isLoggedIn: false, displayName: "", profilePic: "" });
    //Redirect the user to the login page immediately
    navigate('/login');
  };

  return (
    <nav className="navbar" >
      
      {/* 1. Logo */}
      <h2><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>MyWolt</Link></h2>

      {/* 2. Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          ref={searchInputRef} 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Search restaurants..." 
        />
        <button onClick={handleFocusSearch}>Search</button>
      </div>

      {/* 3. User Controls & Theme */}
      <div className="user-controls">
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Conditional Rendering: Check if user is logged in */}
        {user.isLoggedIn ? (
          // Logged-In View: Show profile picture, name, and logout button
          <div className="profile-section">
            <img 
              src={user.profilePic} 
              alt="Profile" 
              className="profile-pic"
            />
            <span>{user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          // Logged-Out View: Show login and register links
          <div className="profile-section">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;