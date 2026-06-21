const Restaurant = require('../models/restaurant');

// GET /api/restaurants - returns all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// POST /api/restaurants - creates a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, address, description, phone, cuisineType, lat, lng } = req.body;

    // name is required
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Validation for valid location coordinates
    if (lat === undefined || lng === undefined || typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Valid location coordinates (lat and lng numbers) are required' });
    }

    // Create a new restaurant document
    const restaurant = await Restaurant.create({ 
        name, address, description, phone, cuisineType, lat, lng 
    });
    
    // Return 201 Created with a Location header pointing to the new restaurant
    res.status(201).location(`/api/restaurants/${restaurant._id}`).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create restaurant" });
  }
};

// GET /api/restaurants/:id - returns a single restaurant by id
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Invalid restaurant ID format" });
  }
};

// PATCH /api/restaurants/:id - partially updates an existing restaurant
const updateRestaurant = async (req, res) => {
  try {
    // Find the restaurant first because we might need to calculate average ratings
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Handle customer rating requests
    if (req.body.userRatingScore !== undefined) {
      const userId = req.headers['x-user-id']; // Or req.user._id if using Auth Middleware
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required to rate' });
      }

      const score = Number(req.body.userRatingScore);

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

      // Save the updated document to MongoDB
      await restaurant.save();

      return res.status(200).json({
        message: 'Rating updated',
        averageRating: restaurant.averageRating
      });
    }
      
    // Extract fields from the request body for partial update
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

    // Save changes to DB
    await restaurant.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update restaurant" });
  }
};

// DELETE /api/restaurants/:id - deletes a restaurant by id
const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
};

// Export all controller functions to be used by the router
module.exports = { 
    getAllRestaurants, 
    createRestaurant, 
    getRestaurantById, 
    updateRestaurant, 
    deleteRestaurant 
};