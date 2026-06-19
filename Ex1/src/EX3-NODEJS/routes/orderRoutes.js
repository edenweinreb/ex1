const express = require('express');
const router = express.Router();

// Import the new functions from the controller as well
const { 
  createOrder, 
  getOrders, 
  getOrderById, 
  getOrdersByUserId,
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders);

// New routes with the ID parameter:
router.get('/user/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;