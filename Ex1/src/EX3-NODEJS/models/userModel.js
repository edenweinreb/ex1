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

// Find user by name and password
const authenticateUser = (name, password) => {
    return users.find(user => user.name === name && user.password === password);
};

module.exports = {
    createUser,
    getUserById,
    authenticateUser
};