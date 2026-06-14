import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetail() {
  const { id } = useParams(); // Extracts the ID from the URL dynamically
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific order details using the ID from the URL
    fetch(`http://localhost:3000/api/orders/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Order not found');
        return res.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '30px', textAlign: 'center' }}>Loading order details...</div>;
  if (!order) return <div style={{ padding: '30px', textAlign: 'center' }}>Order not found.</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/history')} 
        style={{ marginBottom: '25px', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ← Back to Order History
      </button>

      <div style={{ border: '1px solid #eee', borderRadius: '16px', padding: '30px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Order Receipt</h2>
        <p style={{ color: '#999', margin: '0 0 20px 0' }}>ID: {order.id}</p>
        
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#777' }}>Status:</span>
            <span style={{ fontWeight: 'bold', color: '#2ecc71' }}>{order.status.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#777' }}>Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Items Ordered</h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {order.items.map((item, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#555', marginRight: '10px' }}>{item.quantity}x</span>
                <span>{item.name || 'Product'}</span>
              </div>
              <span style={{ fontWeight: '600' }}>₪{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '25px', fontSize: '20px', borderTop: '2px solid #ddd', paddingTop: '15px' }}>
          <span>Total Paid:</span>
          <span style={{ color: '#2c3e50' }}>₪{order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;