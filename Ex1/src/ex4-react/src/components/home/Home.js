import React, { useState, useEffect } from 'react';

function Home() {
  // State to store the restaurants received from the server
  const [restaurants, setRestaurants] = useState([]);

  // State variable that stores the text entered by the user in the search field
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch restaurants from the server when the component loads
  useEffect(() => {
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);

  // Keeps only restaurants whose name contains the text in the search field
  const filteredRestaurants = restaurants.filter(restaurant =>
  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Home Page - Restaurant List</h2>
      <p>Welcome! Here are the currently available restaurants:</p>

    {/* Text input field used to search restaurants by name */}
    <input
      type="text"
      placeholder="Search for a restaurant..."
      value={searchTerm}
      // Updates the searchTerm state whenever the user types in the input field
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '8px',
        width: '300px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}
    />

      {/* Display the restaurants received from the server */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}
          >
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;