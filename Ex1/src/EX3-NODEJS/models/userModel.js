const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Automatically prevents duplicate names
  },
  password: {
    type: String,
    required: true
  }
  // Add any other fields you need here (e.g., profileImage)
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);