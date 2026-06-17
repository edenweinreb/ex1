import React, { useState, useEffect } from 'react';
import RestaurantMenu from '../restaurants/RestaurantMenu';
import { useNavigate } from 'react-router-dom';

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
    { name: 'Cafes', type: 'coffee', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150' },
    { name: 'Breakfast', type: 'breakfast', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=150' },
    { name: 'Desserts', type: 'dessert', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150' },
    { name: 'Burgers', type: 'burger', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150' },
    { name: 'Pizza', type: 'pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150' }
  ];

  // Apply search and cuisine filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine ? restaurant.cuisineType === selectedCuisine : true;
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <h2>Restaurants</h2>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center' }}>
        {/* Search Input Field */}
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '20px', border: '1px solid #ccc' }}
        />

        {/* Dropdown Menu for sorting functionality */}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }}
        >
          <option value="distance">Sort by: Nearby</option>
          <option value="rating">Sort by: Highest Rating</option>
        </select>
      </div>

      {/* Visual UI Categories (Horizontal scrollable circle list) */}
      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '30px' }}>
        {categories.map((cat) => (
          <div 
            key={cat.type} 
            onClick={() => setSelectedCuisine(selectedCuisine === cat.type ? '' : cat.type)}
            style={{ textAlign: 'center', cursor: 'pointer', opacity: selectedCuisine && selectedCuisine !== cat.type ? 0.5 : 1 }}
          >
            <img 
              src={cat.img} 
              alt={cat.name} 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: selectedCuisine === cat.type ? '3px solid #333' : '1px solid #eee' }} 
            />
            <div style={{ marginTop: '8px', fontSize: '14px' }}>{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Render Section displaying the filtered and sorted restaurants */}
      <h3>Available Restaurants</h3>
      {sortedRestaurants.length === 0 ? <p>No restaurants found matching your criteria.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {sortedRestaurants.slice(0, 30).map(r => (
            <div key={r.id} onClick={() => navigate(`/restaurants/${r.id}`)} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '12px', cursor: 'pointer', backgroundColor: '#fff' }} >
              <h4>{r.name}</h4>
              <p>{r.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px', color: '#555' }}>
                <span>⭐ {r.rating} ★</span>
                <span>📍 Distance score: {r.distance !== Infinity ? r.distance.toFixed(4) : 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;