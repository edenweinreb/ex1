const express = require('express');
const router = express.Router();

// Import the new functions from the controller as well
const { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');

router.post('/orders', createOrder);
router.get('/orders', getOrders);

// New routes with the ID parameter:
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;