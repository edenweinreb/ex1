const Order = require('../models/orderModel');

// Temporary array for storing orders
const ordersDatabase = [];

const createOrder = (req, res) => {
  // Create a new order object from the class
  const newOrder = new Order(req.body);
  
  ordersDatabase.push(newOrder);
  
  res.status(201).json({
    message: 'Order created successfully',
    order: newOrder
  });
};


// GET - Get a specific order by ID
const getOrderById = (req, res) => {
    const { id } = req.params; // Gets the ID from the URL
    const order = ordersDatabase.find(o => o.id === id);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    res.status(200).json(order);
  };
  
  // PATCH - Update an order
  const updateOrder = (req, res) => {
    const { id } = req.params;
    const order = ordersDatabase.find(o => o.id === id);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    // Updates only the fields sent in the request body (for example: status)
    Object.assign(order, req.body);
  
    res.status(204).json({ message: 'Order updated', order });
  };
  
  // DELETE - Delete an order
  const deleteOrder = (req, res) => {
    const { id } = req.params;
    const orderIndex = ordersDatabase.findIndex(o => o.id === id);
  
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    // Remove the order from the array
    ordersDatabase.splice(orderIndex, 1);
  
    res.status(204).json({ message: 'Order deleted successfully' });
  };
  
  
  module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
  };