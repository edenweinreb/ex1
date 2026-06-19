import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// Accept setUser as a prop to update the global state
function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      // 1. Fetch the JWT token
      const tokenResponse = await fetch('http://localhost:3000/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password: password }),
      });

      if (!tokenResponse.ok) {
        setError('Invalid username or password.');
        return;
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.token || tokenData; 
      
      // Fallback to username if server doesn't return id
      const userId = tokenData.id || username; 

      // 2. Fetch full user details using the user ID
      const userResponse = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();

      // 3. Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', userData.role || 'user');
      localStorage.setItem('user', JSON.stringify(userData));

      // 4. Update the global state so Header updates instantly
      if (setUser) {
          setUser(userData);
      }
      
      // 5. Redirect to home page
      navigate('/');

    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-login">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;