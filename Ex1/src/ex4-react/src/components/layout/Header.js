import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Manage search input state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Manage application theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Direct reference to the search input DOM element
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement global CSS class toggle logic here
  };

  return (
    <nav style={{ background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      <div className="nav-container">
        <h1><Link to="/">MyWolt</Link></h1>

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

        <ul className="nav-links">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li>
            <button onClick={toggleTheme}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;