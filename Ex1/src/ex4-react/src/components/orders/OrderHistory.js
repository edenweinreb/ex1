import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch logged-in user to pass their ID in headers
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    // Fetch all user orders from the server
    fetch(`http://localhost:3000/api/orders/user/${currentUser.id}`, {
      headers: {
        'x-user-id': currentUser?.id
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, [currentUser]);


  const rateRestaurant = (e, restaurantId, score) => {
    e.stopPropagation(); // Prevents going to the order details page when clicking on a star

    fetch(`http://localhost:3000/api/restaurants/${restaurantId}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-id': currentUser?.id 
      },
      body: JSON.stringify({ userRatingScore: score })
    })
      .then(res => {
        if (res.ok) {
          alert('Thank you for rating the restaurant!');
        } else {
          alert('Failed to submit rating.');
        }
      })
      .catch(err => console.error("Error submitting rating:", err));
  };

  return (
    <div className="history-container">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Home
      </button>

      <h2 className="history-title">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="empty-history">You haven't placed any orders yet.</p>
      ) : (
        <div className="history-list">
          {orders.slice(0, 10).map((order) => (
            <div 
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)} // Changes the URL dynamically to /orders/<id>
              className="history-card"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              
              {/* Top part: Order Info & Price */}
              <div className="history-card-top">
                <div>
                <span className={`status-badge ${order.status === 'pending' ? 'pending' : 'completed'}`}>
                    {order.status}
                  </span>
                  <div className="order-id">
                    Order #{order.id.substring(0, 8)}...
                  </div>
                  <small className="order-date">{new Date(order.createdAt).toLocaleDateString()}</small>
                </div>

                <div className="order-price">
                  ₪{order.totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Bottom part: Rating */}
              <div className="rating-section" onClick={(e) => e.stopPropagation()}>
                <span className="rating-title">Rate the restaurant:</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      onClick={(e) => rateRestaurant(e, order.restaurantId, star)}
                      className="star-icon"
                      //onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                      //onMouseLeave={(e) => e.target.style.color = '#ccc'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;