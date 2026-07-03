const Order = require('../models/orderModel');
const Restaurant = require('../models/restaurant');
const Product = require('../models/product');

// Helper function to populate product details asynchronously
const populateOrderItems = async (order) => {
  // Promise.all is used to wait for all inner async DB queries to finish
  const populatedItems = await Promise.all(order.items.map(async (item) => {
    try {
      const product = await Product.findById(item.productId);
      if (product) {
        return { 
            id: product._id, 
            name: product.name, 
            price: product.price, 
            quantity: item.quantity 
        };
      }
      return { id: item.productId, error: "Product not found", quantity: item.quantity };
    } catch (err) {
      return { id: item.productId, error: "Invalid product ID", quantity: item.quantity };
    }
  }));

  // Convert Mongoose document to a plain JS object before modifying
  const orderObj = order.toObject ? order.toObject() : order;
  
  return {
    id: orderObj._id,
    userId: orderObj.userId,
    restaurantId: orderObj.restaurantId,
    items: populatedItems,
    totalAmount: orderObj.totalAmount,
    status: orderObj.status,
    createdAt: orderObj.createdAt
  };
};

const createOrder = async (req, res) => {
  try {
      const { restaurantId, items, userId, totalAmount } = req.body; 

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
          return res.status(404).json({ error: "Restaurant not found" });
      }

      /*
      let calculatedTotalAmount = 0;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product || product.restaurantId.toString() !== restaurantId.toString()) {
            return res.status(400).json({ error: `Product ID '${item.productId}' not found...` });
        }
        calculatedTotalAmount += (product.price * item.quantity);
      }
      */

      const newOrder = await Order.create({
          userId,
          restaurantId,
          items,
          totalAmount, 
          status: 'pending'
      });
      
      res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
      console.error("DEBUG ERROR:", error);
      res.status(500).json({ error: "Server error", details: error.message });
  }
};

// GET - Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        
        // Populate items for each order asynchronously
        const populatedOrders = await Promise.all(orders.map(order => populateOrderItems(order)));
        res.status(200).json(populatedOrders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

// GET - Get a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
      
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
      
        const populatedOrder = await populateOrderItems(order);
        res.status(200).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Invalid order ID format or server error" });
    }
};

// GET - Get all orders for a specific user
const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Query the DB for orders matching the userId
        const userOrders = await Order.find({ userId: userId });

        const populatedOrders = await Promise.all(userOrders.map(populateOrderItems));
        res.status(200).json(populatedOrders);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user orders" });
    }
};
  
// PATCH - Update an order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find by ID and update. { new: true } returns the updated document.
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }
      
        res.status(200).json({ message: 'Order updated', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};
  
// DELETE - Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
      
        if (!deletedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }
      
        res.status(204).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};
  
module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    deleteOrder
};