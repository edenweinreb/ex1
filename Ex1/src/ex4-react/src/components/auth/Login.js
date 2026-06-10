import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
 
function Login() {
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
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
 
      if (response.ok) {
        const data = await response.json();
        // Save JWT token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to home page
        navigate('/');
      } else {
        setError('Invalid username or password.');
      }
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
 