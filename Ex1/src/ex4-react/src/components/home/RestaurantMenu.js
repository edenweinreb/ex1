import React, { useState, useEffect } from 'react';

function RestaurantMenu({ restaurant, onBack }) {
  // State to store the products fetched from the server
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (restaurant) {
      // Fetch the specific products/items for this restaurant ID
      fetch(`http://localhost:3000/api/restaurants/${restaurant.id}/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error("Error fetching products:", err));
    }
  }, [restaurant]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Back button to return to the home screen grid */}
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '25px', 
          padding: '10px 15px', 
          borderRadius: '20px', 
          border: '1px solid #ccc', 
          backgroundColor: '#fff', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Back to Restaurants
      </button>

      {/* Restaurant Info Header */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>{restaurant.name}</h2>
        <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '16px' }}>{restaurant.description}</p>
        <small style={{ color: '#999', fontSize: '14px' }}>📍 {restaurant.address} | 📞 {restaurant.phone}</small>
      </div>

      {/* Menu / Products List Section */}
      <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Menu Items</h3>
      {products.length === 0 ? (
        <p style={{ color: '#777' }}>No products available for this restaurant yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {products.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                border: '1px solid #e6e6e6', 
                padding: '20px', 
                borderRadius: '12px', 
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.4' }}>{item.description}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#2c3e50' }}>₪{item.price}</span>
                {/* Shopping cart */}
                <button 
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    backgroundColor: '#000', 
                    color: '#fff', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default RestaurantMenu;