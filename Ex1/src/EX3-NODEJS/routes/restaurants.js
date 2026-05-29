// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import all controller functions for restaurants
const ctrl = require('../controllers/restaurantController');

// GET /api/restaurants - get all restaurants
router.get('/', ctrl.getAllRestaurants);

// POST /api/restaurants - create a new restaurant
router.post('/', ctrl.createRestaurant);

// GET /api/restaurants/:id - get a single restaurant by id
router.get('/:id', ctrl.getRestaurantById);

// PATCH /api/restaurants/:id - partially update a restaurant by id
router.patch('/:id', ctrl.updateRestaurant);

// DELETE /api/restaurants/:id - delete a restaurant by id
router.delete('/:id', ctrl.deleteRestaurant);

// Export the router to be used in app.js
module.exports = router;