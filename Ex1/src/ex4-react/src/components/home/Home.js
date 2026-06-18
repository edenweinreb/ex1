import React, { useState, useEffect } from 'react';
import RestaurantMenu from '../restaurants/RestaurantMenu';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const navigate = useNavigate();

  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  // Mathematical function to calculate distance using coordinates (Pythagoras)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    // If user is not logged in or doesn't have profile coordinates, stop and wait
    if (!lat1 || !lng1 || !lat2 || !lng2) return Infinity; // Return Infinity if coordinates are missing
    const deltaLat = lat1 - lat2;
    const deltaLng = lng1 - lng2;
    return Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
  };

  // Fetch restaurants from the server and compute distances when currentUser is available
  useEffect(() => {
    if (!currentUser || !currentUser.lat || !currentUser.lng) return;

    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        // Map through restaurants and inject the calculated distance score
        const restaurantsWithDistance = data.map(rest => ({
          ...rest,
          distance: calculateDistance(currentUser.lat, currentUser.lng, rest.lat, rest.lng)
        }));
        setRestaurants(restaurantsWithDistance);
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, [currentUser]);

  // If the user is not logged in at all, deny access and show a message
  if (!currentUser) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Please log in to view restaurants tailored to your profile.</p>
      </div>
    );
  }

  // If the user is logged in but hasn't set coordinates in their profile
  if (!currentUser.lat || !currentUser.lng) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Missing Location Data</h2>
        <p>Notice: No coordinates found in your profile. Please update your profile location to calculate distances.</p>
      </div>
    );
  }

  // Defined categories for the visual circle buttons (matching the provided UI design)
  const categories = [
    { name: 'Bakery', type: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150' },
    { name: 'Desserts', type: 'dessert', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150' },
    { name: 'Burgers', type: 'burger', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150' },
    { name: 'Pizza', type: 'pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150' },
    { name: 'Middle Eastern', type: 'middle-eastern', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400' },
    { name: 'Healthy', type: 'healthy', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150' },
    { name: 'Asian', type: 'asian', img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400' },
    { name: 'Sushi', type: 'sushi', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150' }

  ];

  // Apply search and cuisine filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesCuisine = selectedCuisine 
      ? restaurant.cuisineType && restaurant.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
      : true;
      
    return matchesSearch && matchesCuisine;
  });

  // Sort the dynamic list based on the dropdown selection (sortBy)
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance; // Closest first
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating; // Highest rated first
    }
    return 0;
  });

  return (
    <div className="home-container">      
      <h2>Restaurants</h2>
      
      <div className="home-controls">
        {/* Search Input Field */}
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="home-search-input"
        />

        {/* Dropdown Menu for sorting functionality */}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="home-sort-select"
        >
          <option value="distance">Sort by: Nearby</option>
          <option value="rating">Sort by: Highest Rating</option>
        </select>
      </div>

      {/* Visual UI Categories (Horizontal scrollable circle list) */}
      <div className="home-categories">
        {categories.map((cat) => (
          <div 
            key={cat.type} 
            onClick={() => setSelectedCuisine(selectedCuisine === cat.type ? '' : cat.type)}
            className={`category-item ${selectedCuisine && selectedCuisine !== cat.type ? 'faded' : ''}`}
          >
            <img 
              src={cat.img} 
              alt={cat.name} 
              className={`category-img ${selectedCuisine === cat.type ? 'active' : ''}`}
            />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Render Section displaying the filtered and sorted restaurants */}
      <h3>Available Restaurants</h3>
      {sortedRestaurants.length === 0 ? <p>No restaurants found matching your criteria.</p> : (
        <div className="home-restaurants-grid">
          {sortedRestaurants.slice(0, 30).map(r => (
            <div key={r.id} onClick={() => navigate(`/restaurants/${r.id}`)} className="restaurant-card">
              <h4>{r.name}</h4>
              <p>{r.description}</p>
              <div className="restaurant-card-footer">
                <span>⭐ {r.rating} ★</span>
                <span style={{ color: '#888', fontWeight: '500' }}>
                  📍 {r.distance !== Infinity ? `${r.distance.toFixed(1)} km` : 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;