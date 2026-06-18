import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantMenu.css';

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
       .then(data => {
          setRestaurant(data);
          setProducts(data.menu || []); 
        })
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

  // Function to delete the restaurant
  const handleDeleteRestaurant = () => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;

    fetch(`http://localhost:3000/api/restaurants/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': currentUser?.id // Passing user ID to verify admin rights in backend
      }
    })
      .then(async (res) => {
        if (res.ok) {
          alert('Restaurant deleted successfully.');
          navigate('/'); // Redirect to home page
        } else {
          const errorData = await res.json();
          alert(`Failed to delete: ${errorData.message}`);
        }
      })
      .catch(err => console.error("Error deleting restaurant:", err));
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
          navigate('/history');
        } else {
          alert('Failed to place order.');
        }
      })
      .catch(err => console.error("Error submitting order:", err));
  };

    
    return (
      <div className="menu-container">
      
      <div className="menu-main">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Restaurants
        </button>
  
          {/* Main Header Area: Info, Rating, and Admin Delete */}
          <div className="restaurant-header">
            <div>
              {/* Title and Average Rating Badge */}
              <div className="restaurant-title-row">
              <h2 className="restaurant-title">{restaurant.name}</h2>
              <span className="restaurant-rating">
                  {restaurant.averageRating ? restaurant.averageRating.toFixed(1) : 'New'} 😊
                </span>
              </div>
              
              <p className="restaurant-desc">{restaurant.description}</p>
              <small style={{ color: '#999', fontSize: '14px', display: 'block', marginBottom: '15px' }}>📍 {restaurant.address} | 📞 {restaurant.phone}</small>
            </div>
            
            {/* Delete Button - Only visible if user is admin */}
            {currentUser?.role === 'owner' && (
              <button 
                onClick={handleDeleteRestaurant}
                className="delete-btn">
                Delete Restaurant
              </button>
            )}
          </div>
  
          <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Menu</h3>
          {products.length === 0 ? (
            <p style={{ color: '#777' }}>No menu items available for this restaurant yet.</p>
          ) : (
            <div className="menu-grid">
              {/* Limit to 10 products */}
              {products.slice(0, 10).map((item) => (
                <div key={item.id} className="menu-item-card">
                  <div>
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-desc">{item.description}</p>
                  </div>
                  
                  <div className="item-footer">
                    <span className="item-price">₪{item.price}</span>
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
        <div className="cart-sidebar">
          
          {/* Header */}
          <div className="cart-header">
            <h3 className="cart-title">Your Order</h3>
          </div>
  
          {/* Cart Items List */}
          <div className="cart-items-container">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    
                    <div className="cart-item-left">
                    <div className="cart-item-qty">{item.quantity}</div>
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <small className="cart-item-desc">{item.description ? item.description.substring(0, 40) + '...' : ''}</small>
                    </div>
                  </div>
                  <div className="cart-item-price">
                     ₪{(item.price * item.quantity).toFixed(2)}
                    </div>
  
                  </li>
                ))}
              </ul>
            )}
          </div>
  
          {/* Bottom Floating Checkout Button */}
          {cart.length > 0 && (
          <div className="checkout-wrapper">
            <button onClick={handleCheckout} className="checkout-btn">
              <span className="checkout-qty-badge">
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