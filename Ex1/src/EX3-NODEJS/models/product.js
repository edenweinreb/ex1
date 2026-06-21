const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  numericId: {
    type: Number,
    required: true,
    unique: true 
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0 
  },
  image: { type: String }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);