const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/restaurantController');
const { requireAuth } = require('../controllers/userController');

// Public routes
router.get('/', ctrl.getAllRestaurants);
router.get('/:id', ctrl.getRestaurantById);

// Protected routes
router.post('/', requireAuth, ctrl.createRestaurant);
router.patch('/:id', requireAuth, ctrl.updateRestaurant);
router.delete('/:id', requireAuth, ctrl.deleteRestaurant);

module.exports = router;