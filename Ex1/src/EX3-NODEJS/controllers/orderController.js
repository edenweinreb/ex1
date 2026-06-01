const Order = require('../models/orderModel');
const { restaurants } = require('../controllers/restaurantController');
const { products } = require('../controllers/productController');



// Temporary array for storing orders
const orders = [];

const createOrder = async (req, res) => {
  try {
      const { restaurantId, items } = req.body;
      //const userId = req.user.id;
      const userId = req.headers['x-user-id'];

      // Check if the restaurant exist
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (!restaurant) {
          return res.status(404).json({ error: "Restaurant not found" });
      }

      let totalAmount = 0;
      //const foundItems = [];

      for (const itemName of items) {
          const product = products.find(p => p.name === itemName && p.restaurantId === restaurantId);
          if (!product) {
              return res.status(400).json({ error: `Product '${itemName}' not found in this restaurant` });
          }
          totalAmount += product.price;
          //foundItems.push(product);
      }

      // Create a new order object from the class
      const newOrder = new Order({
          userId,
          restaurantId,
          items,
          totalAmount,
          status: 'pending'
      });
      
      orders.push(newOrder);
      
      res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
    console.error("DEBUG ERROR:", error); // זה יכתוב את השגיאה המלאה ללוגים
    res.status(500).json({ error: "Server error", details: error.message });
      //res.status(500).json({ error: "Server error during order creation" });
  }
};

// GET - Get all orders
const getOrders = (req, res) => {
    res.status(200).json(orders);
};

// GET - Get a specific order by ID
const getOrderById = (req, res) => {
    const { id } = req.params; // Gets the ID from the URL
    const order = orders.find(o => o.id === id);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    res.status(200).json(order);
  };
  
  // PATCH - Update an order
  const updateOrder = (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === id);
  
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
    const orderIndex = orders.findIndex(o => o.id === id);
  
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    // Remove the order from the array
    orders.splice(orderIndex, 1);
  
    res.status(204).json({ message: 'Order deleted successfully' });
  };
  
  
  module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
  };