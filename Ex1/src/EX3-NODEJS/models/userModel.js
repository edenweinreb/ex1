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
  },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
  // Add any other fields you need here (e.g., profileImage)
}, {
  timestamps: true
});

const createUser = (userData) => {
    const existingUser = users.find(user => user.name === userData.name);

    if (existingUser) {
        throw new Error ('Username already exists');
    }

    const newUser = {
        id: crypto.randomUUID(),
        ...userData
    };
    users.push(newUser);
    return newUser;
};

const getUserById = (id) => {
    return users.find(user => user.id === id);
};

// Find user by name
const getUserByName = (name) => {
    return users.find(user => user.name === name);
};

module.exports = {
    createUser,
    getUserById,
    getUserByName
};
module.exports = mongoose.model('User', userSchema);
