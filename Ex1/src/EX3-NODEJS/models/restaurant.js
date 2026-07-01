const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  phone: {
    type: String
  },
  cuisineType: {
    type: String
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  ratings: [{ 
    userId: { type: String, required: true }, 
    score: { type: Number, required: true } 
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  image: { type: String },
  menu: [{
    id: String,
    name: String,
    description: String,
    price: Number,
    image: String
  }]
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

module.exports = mongoose.model('Restaurant', restaurantSchema);