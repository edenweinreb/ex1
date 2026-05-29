const Restaurant = require('../models/restaurant');

// In-memory storage for all restaurants 
const restaurants = [];

// // GET /api/restaurants - returns all restaurant
const getAllRestaurants = (req, res) => {
  res.status(200).json(restaurants);
};

// POST /api/restaurants - creates a new restaurant
const createRestaurant = (req, res) => {
  const { name, address, description, phone, cuisineType } = req.body;

  // name is required - return 400 if missing
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  // Create a new restaurant object and add it to the array
  const restaurant = new Restaurant({ name, address, description, phone, cuisineType });
  restaurants.push(restaurant);
  // Return 201 Created with a Location header pointing to the new restaurant
  res.status(201).location(`/api/restaurants/${restaurant.id}`).send();
};

// GET /api/restaurants/:id - returns a single restaurant by id
const getRestaurantById = (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);
  // Return 404 if no restaurant found with that id
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.status(200).json(restaurant);
};

// PATCH /api/restaurants/:id - partially updates an existing restaurant
const updateRestaurant = (req, res) => {
// Search the array for a restaurant with matching id from the URL
  const restaurant = restaurants.find(r => r.id === req.params.id);
// Return 404 if no restaurant found with that id
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  
// Extract fields from the request body
  const { name, address, description, phone, cuisineType } = req.body;
// Only update fields that were actually sent 
  if (name) restaurant.name = name;
  if (address) restaurant.address = address;
  if (description) restaurant.description = description;
  if (phone) restaurant.phone = phone;
  if (cuisineType) restaurant.cuisineType = cuisineType;
// Return 204 No Content - success but nothing to return
  res.status(204).send();
};

// DELETE /api/restaurants/:id - deletes a restaurant by id
const deleteRestaurant = (req, res) => {
// Find the index of the restaurant in the array
  const index = restaurants.findIndex(r => r.id === req.params.id);
// Return 404 if no restaurant found with that id
  if (index === -1) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
// Remove 1 element at the found index
  restaurants.splice(index, 1);
// Return 204 No Content - success but nothing to return
  res.status(204).send();
};

// Export all controller functions to be used by the router
module.exports = { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, restaurantsDatabase: restaurants };