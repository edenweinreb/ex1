import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
 
function Register() {
  const navigate = useNavigate();
 
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  // default is regular user
  const [role, setRole] = useState('user'); 

  // User's home location, used to calculate distance to restaurants
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
 
  const fileInputRef = useRef(null);
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    // Basic validation
    if (!username || !displayName || !password || !verifyPassword || !profilePic|| !lat || !lng || !address) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must be at least 8 characters and include letters and numbers.');
      return;
    }
    if (password !== verifyPassword) {
      setError('Passwords do not match.');
      return;
    }
 
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: username,
            password,
            displayName,
            profilePic: reader.result,
            role, 
            lat: Number(lat),
            lng: Number(lng),
            address
          }),
        });
 
        if (response.ok) {
          navigate('/login');
        } else {
          const data = await response.json();
          setError(data.error || data.message || 'Registration failed.');
        }
      };
      reader.readAsDataURL(profilePic);
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };
 
  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Register</h2>
 
        {error && <p className="error-msg">{error}</p>}
 
        <form onSubmit={handleSubmit}>
 
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
 
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
 
          <input
            type="password"
            placeholder="Password (min 8 chars, letters & numbers)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
 
          <input
            type="password"
            placeholder="Confirm Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
 
          <div className="file-upload-wrapper">
            {previewUrl && <img src={previewUrl} alt="Preview" className="pic-preview" />}
            <button type="button" className="btn-upload-custom" onClick={() => fileInputRef.current.click()}>
              {previewUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
            <input
            type="number"
            step="any"
            placeholder="Latitude (e.g. 32.18)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
 
          <input
            type="number"
            step="any"
            placeholder="Longitude (e.g. 34.87)"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Regular User</option>
            <option value="owner">Restaurant Owner</option>
          </select>
 
          <button type="submit" className="btn-register">Create Account</button>
        </form>
 
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
 
export default Register;
 