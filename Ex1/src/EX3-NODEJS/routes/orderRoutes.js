const express = require('express');
const router = express.Router();

// ייבוא פונקציית האימות מהקונטרולר של המשתמשים
const { requireAuth } = require('../controllers/userController');

const { 
  createOrder, 
  getOrders, 
  getOrderById, 
  getOrdersByUserId,
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');

router.post('/', requireAuth, createOrder);
router.get('/user/:userId', requireAuth, getOrdersByUserId);

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;