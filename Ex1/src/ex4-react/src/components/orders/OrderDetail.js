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
    <div className="order-detail-container">
      <button onClick={() => navigate('/history')} className="back-btn">
        ← Back to Order History
      </button>

      <div className="receipt-card">
        <h2 className="receipt-title">Order Receipt</h2>
        <p className="receipt-id">ID: {order.id}</p>
        
        <div className="receipt-info-section">
          <div className="receipt-info-row">
            <span className="receipt-label">Status:</span>
            <span className="receipt-status">{order.status.toUpperCase()}</span>
          </div>
          <div className="receipt-info-row">
            <span className="receipt-label">Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <h3 className="items-title">Items Ordered</h3>
        <ul className="items-list">
          {order.items.map((item, index) => (
            <li key={index} className="item-row">
              <div>
                <span className="item-qty">{item.quantity}x</span>
                <span>{item.name || 'Product'}</span>
              </div>
              <span className="item-price">₪{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="receipt-total-row">
          <span>Total Paid:</span>
          <span className="total-amount">₪{order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;