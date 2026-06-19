import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRestaurant.css';

function AddRestaurant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', description: '', address: '', phone: '', 
    cuisineType: '', image: '', lat: '', lng: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      })
    })
    .then(res => {
      if (res.ok) {
        alert('Restaurant added!');
        navigate('/');
      } else {
        res.json().then(errorData => alert(`Error: ${errorData.error || 'Failed to add restaurant'}`));
      }
    });
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add New Restaurant</h2>
      <form className="add-restaurant-form" onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} required />
        <input placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} required />
        <input placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} required />
        <input placeholder="Cuisine Type" onChange={e => setFormData({...formData, cuisineType: e.target.value})} required />
        <input placeholder="Image URL" onChange={e => setFormData({...formData, image: e.target.value})} />
        
        <input type="number" step="any" placeholder="Latitude (e.g. 32.1)" onChange={e => setFormData({...formData, lat: e.target.value})} required />
        <input type="number" step="any" placeholder="Longitude (e.g. 34.8)" onChange={e => setFormData({...formData, lng: e.target.value})} required />
        
        <button type="submit" className="submit-btn">Create Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurant;