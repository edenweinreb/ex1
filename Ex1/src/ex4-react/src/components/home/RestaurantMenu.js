import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RestaurantMenu() {
  const { id } = useParams(); // Automatically extracts the ID from the URL
  const navigate = useNavigate(); // For the back button
  
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (id) {
      // Gets the restaurant details (name, description, address)
      fetch(`http://localhost:3000/api/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
        .catch(err => console.error(err));

      // Brings the products of that restaurant
      fetch(`http://localhost:3000/api/restaurants/${id}/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  // Protection in case the data from the server is still loading
  if (!restaurant) return <div style={{ padding: '20px' }}>Loading menu...</div>;

  // Function to add a product to the cart (increments quantity if already exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to calculate the total price of the cart locally for the UI
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to submit the order to the backend API
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Formatting data structure to match exactly what your updated Backend controller expects
    const orderData = {
      restaurantId: restaurant.id,
      items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
    };

    fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': currentUser?.id // Passing user ID via custom headers as required by your backend
      },
      body: JSON.stringify(orderData)
    })
      .then(res => {
        if (res.status === 201) {
          alert('Order placed successfully!');
          setCart([]); // Clear the cart state upon success
        } else {
          alert('Failed to place order.');
        }
      })
      .catch(err => console.error("Error submitting order:", err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', display: 'flex', gap: '30px', direction: 'ltr' }}>
      
      {/* Main Left/Center Section: Restaurant Header & Menu Items Grid */}
      <div style={{ flex: 2 }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '25px', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
        >
        ← Back to Restaurants
      </button>

        <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>{restaurant.name}</h2>
          <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '16px' }}>{restaurant.description}</p>
          <small style={{ color: '#999', fontSize: '14px' }}>📍 {restaurant.address} | 📞 {restaurant.phone}</small>
        </div>

        <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Menu</h3>
        {products.length === 0 ? (
          <p style={{ color: '#777' }}>No menu items available for this restaurant yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {products.map((item) => (
              <div key={item.id} style={{ border: '1px solid #e6e6e6', padding: '20px', borderRadius: '12px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.name}</h4>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.4' }}>{item.description}</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#2c3e50' }}>₪{item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#000', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar Section: Shopping Cart (Wolt-like UI) */}
      <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: '20px', minWidth: '320px', display: 'flex', flexDirection: 'column', height: '80vh', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '22px', margin: 0, fontWeight: 'bold', color: '#1e272e' }}>Your Order</h3>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
          {cart.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', marginTop: '40px' }}>Your cart is empty</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {cart.map((item) => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f9f9f9' }}>
                  
                  {/* Left part (in LTR): Quantity badge & Item Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      width: '35px', 
                      height: '35px', 
                      borderRadius: '50%', 
                      border: '1px solid #ccc', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 'bold', 
                      color: '#2c3e50',
                      backgroundColor: '#fff'
                    }}>
                      {item.quantity}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#1e272e' }}>{item.name}</div>
                      <small style={{ color: '#777', fontSize: '13px' }}>{item.description ? item.description.substring(0, 40) + '...' : ''}</small>
                    </div>
                  </div>

                  {/* Right part (in LTR): Price */}
                  <div style={{ fontWeight: '600', fontSize: '15px', color: '#2c3e50' }}>
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </div>

                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Floating Checkout Button */}
        {cart.length > 0 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingTop: '10px' }}>
            <button 
              onClick={handleCheckout} 
              style={{ 
                width: '100%', 
                backgroundColor: '#56ccf2', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '15px 20px', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(86, 204, 242, 0.3)'
              }}
            >
              <span style={{ fontSize: '16px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px' }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>Go to Checkout</span>
              <span>₪{calculateTotal().toFixed(2)}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default RestaurantMenu;