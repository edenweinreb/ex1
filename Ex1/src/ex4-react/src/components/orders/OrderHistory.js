import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch logged-in user to pass their ID in headers
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Fetch all orders from the server
    fetch('http://localhost:3000/api/orders', {
      headers: {
        'x-user-id': currentUser?.id
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, [currentUser]);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '25px', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ← Back to Home
      </button>

      <h2 style={{ fontSize: '28px', marginBottom: '25px', color: '#1e272e' }}>Your Order History</h2>

      {orders.length === 0 ? (
        <p style={{ color: '#777' }}>You haven't placed any orders yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.map((order) => (
            <div 
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)} // Changes the URL dynamically to /orders/<id>
              style={{ 
                border: '1px solid #e6e6e6', 
                borderRadius: '12px', 
                padding: '20px', 
                backgroundColor: '#f9f9f9', 
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div>
                <span style={{ 
                  backgroundColor: order.status === 'pending' ? '#f1c40f' : '#2ecc71', 
                  color: '#fff', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {order.status}
                </span>
                <div style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '10px', color: '#2c3e50' }}>
                  Order #{order.id.substring(0, 8)}...
                </div>
                <small style={{ color: '#999' }}>{new Date(order.createdAt).toLocaleDateString()}</small>
              </div>

              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e272e' }}>
                ₪{order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;