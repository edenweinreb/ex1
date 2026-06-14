import React, { useState, useEffect } from 'react';

function RestaurantMenu({ restaurant, onBack }) {
  // Stores the products of the selected restaurant
  const [products, setProducts] = useState([]);

  // Fetch products whenever a restaurant is selected
  useEffect(() => {
    if (restaurant) {
      fetch(`http://localhost:3000/api/restaurants/${restaurant.id}/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error("Error fetching products:", err));
    }
  }, [restaurant]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Returns the user to the restaurant list */}
      <button
        onClick={onBack}
        style={{ marginBottom: '20px', padding: '8px 12px', cursor: 'pointer' }}
      >
        → Back to Restaurants
      </button>

      <h2>Menu for {restaurant.name}</h2>
      <p>{restaurant.description}</p>

      <div style={{ marginTop: '20px' }}>
        {/* Display a message if no products are available */}
        {products.length === 0 ? (
          <p>No products available for this restaurant.</p>
        ) : (
          // Display all products received from the server
          products.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #eee',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '6px'
              }}
            >
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <span style={{ fontWeight: 'bold' }}>
                Price: ₪{item.price}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;