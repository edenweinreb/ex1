const crypto = require('crypto');

// In-memory data store for users
const users = [];

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