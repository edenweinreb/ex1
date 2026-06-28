const mongoose = require('mongoose');

// Define the Order schema structure
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: {
    type: Array, // Array of items/dishes
    required: true
  },
  totalAmount: {
    type: Number, // Total payment amount
    required: true
  },
  status: {
    type: String, // Order status
    default: 'pending'
  }
}, {
  // Automatically manage createdAt and updatedAt fields
  timestamps: true 
});

// Export the Mongoose model
module.exports = mongoose.model('Order', orderSchema);