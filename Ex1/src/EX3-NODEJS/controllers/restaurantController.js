const Restaurant = require('../models/restaurant');
const initialRestaurants = require('./initialData');

// In-memory storage for all restaurants 
const restaurants = [...initialRestaurants];

// // GET /api/restaurants - returns all restaurant
const getAllRestaurants = (req, res) => {
  res.status(200).json(restaurants);
};

// POST /api/restaurants - creates a new restaurant
const createRestaurant = (req, res) => {
  const { name, address, description, phone, cuisineType, lat, lng } = req.body;

  // name is required - return 400 if missing
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  //If a location was sent but it is not a valid number, or if one of them is missing
  if (lat === undefined || lng === undefined || typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'Valid location coordinates (lat and lng numbers) are required' });
  }

  // Create a new restaurant object and add it to the array
  const restaurant = new Restaurant({ name, address, description, phone, cuisineType, lat, lng });
  restaurants.push(restaurant);
  // Return 201 Created with a Location header pointing to the new restaurant
  res.status(201).location(`/api/restaurants/${restaurant.id}`).json(restaurant);
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

  // Handle customer rating requests
if (req.body.userRatingScore !== undefined) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'User ID is required to rate' });
  }

  const score = req.body.userRatingScore;

  // Update an existing rating or create a new one
  const existingRating = restaurant.ratings.find(r => r.userId === userId);
  if (existingRating) {
    existingRating.score = score;
  } else {
    restaurant.ratings.push({ userId, score });
  }

  // Recalculate the restaurant's average rating
  const totalScore = restaurant.ratings.reduce((sum, r) => sum + r.score, 0);
  restaurant.averageRating = totalScore / restaurant.ratings.length;

  // Return the updated average rating and terminate request processing
  return res.status(200).json({
    message: 'Rating updated',
    averageRating: restaurant.averageRating
  });
}
  
// Extract fields from the request body
  const { name, address, description, phone, cuisineType, lat, lng } = req.body;

  if ((lat !== undefined && typeof lat !== 'number') || (lng !== undefined && typeof lng !== 'number')) {
    return res.status(400).json({ error: 'Location coordinates must be valid numbers' });
  }
// Only update fields that were actually sent 
  if (name) restaurant.name = name;
  if (address) restaurant.address = address;
  if (description) restaurant.description = description;
  if (phone) restaurant.phone = phone;
  if (cuisineType) restaurant.cuisineType = cuisineType;
  if (lat !== undefined) restaurant.lat = lat;
  if (lng !== undefined) restaurant.lng = lng;
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
module.exports = { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, restaurants};