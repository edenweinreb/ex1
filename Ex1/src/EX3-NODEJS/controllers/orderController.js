const Order = require('../models/orderModel');
const { restaurants } = require('../controllers/restaurantController');
const { products } = require('../controllers/productController');



// Temporary array for storing orders
const orders = [];
const populateOrderItems = (order) => {
  const restaurant = restaurants.find(r => r.id === order.restaurantId);
  // Passing through the array of product IDs and replacing them with an object that includes an ID, name, and price
  const populatedItems = order.items.map(item => {
    const product = restaurant ? restaurant.menu.find(p => p.id === item.productId) : null;
    return product 
       ? { id: product.id, name: product.name, price: product.price, quantity: item.quantity }
       : { id: item.productId, error: "Product not found", quantity: item.quantity };
});

  // Returns the updated order object
  return {
    id: order.id,
    restaurantId: order.restaurantId,
    items: populatedItems,
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt
  };
};

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

      for (const item of items) {
        const product = restaurant.menu.find(p => p.id === item.productId);
        if (!product) {
            return res.status(400).json({ error: `Product ID '${item.productId}' not found in this restaurant` });
        }
        // Multiply product price by its selected quantity
        totalAmount += (product.price * item.quantity);
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
    console.error("DEBUG ERROR:", error);
    res.status(500).json({ error: "Server error", details: error.message });
      //res.status(500).json({ error: "Server error during order creation" });
  }
};

// GET - Get all orders
const getOrders = (req, res) => {
    const populatedOrders = orders.map(order => populateOrderItems(order));
    res.status(200).json(populatedOrders);
};

// GET - Get a specific order by ID
const getOrderById = (req, res) => {
    const { id } = req.params; // Gets the ID from the URL
    const order = orders.find(o => o.id === id);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    res.status(200).json(populateOrderItems(order));
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
    deleteOrder,
    orders
  };