import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Home.css';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchTerm(query);
    } else {
      setSearchTerm('');
    }
  }, [searchParams]);

  // Mathematical function to calculate distance using coordinates (Pythagoras)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return Infinity; 
    const deltaLat = lat1 - lat2;
    const deltaLng = lng1 - lng2;
    return Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
  };

  // Fetch restaurants ALWAYS (even for guests)
  useEffect(() => {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        // Check if we have a logged-in user with valid coordinates
        const hasLocation = currentUser && currentUser.lat && currentUser.lng;

        // Map through restaurants and inject the calculated distance score
        const restaurantsWithDistance = data.map(rest => ({
          ...rest,
          distance: hasLocation 
            ? calculateDistance(currentUser.lat, currentUser.lng, rest.lat, rest.lng)
            : Infinity
        }));
        
        setRestaurants(restaurantsWithDistance);
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, [currentUser]);


  // Defined categories for the visual circle buttons
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

  // Sort the dynamic list based on the dropdown selection
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distance - b.distance; 
    }
    if (sortBy === 'rating') {
      const ratingA = a.averageRating || 0;
      const ratingB = b.averageRating || 0;
      return ratingB - ratingA; 
    }
    return 0;
  });

  return (
    <div className="home-container">      
      
      {/* Show a non-blocking warning ONLY if the user is logged in but missing coordinates */}
      {currentUser && (!currentUser.lat || !currentUser.lng) && (
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', color: '#856404' }}>
          Notice: No coordinates found in your profile. Please update your profile to see nearby restaurants.
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ margin: 0 }}>Restaurants</h2>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="home-sort-select"
        >
          <option value="distance">Sort by: Nearby</option>
          <option value="rating">Sort by: Highest Rating</option>
        </select>
      </div>

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

      <h3>Available Restaurants</h3>
      {sortedRestaurants.length === 0 ? <p>No restaurants found matching your criteria.</p> : (
        <div className="home-restaurants-grid">
          {sortedRestaurants.slice(0, 30).map(r => (
            <div key={r.id} onClick={() => navigate(`/restaurants/${r.id}`)} className="restaurant-card">
              
              <img 
                src={r.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600"} 
                alt={r.name} 
                className="restaurant-card-img" 
              />
              
              <div className="restaurant-card-content">
                <h4>{r.name}</h4>
                <p>{r.description}</p>
                <div className="restaurant-card-footer">
                  <span>⭐ {r.averageRating ? r.averageRating.toFixed(1) : 'New'} ★</span>
                  <span style={{ color: '#888', fontWeight: '500' }}>
                    📍 {r.distance !== Infinity ? `${r.distance.toFixed(1)} km` : 'N/A'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;