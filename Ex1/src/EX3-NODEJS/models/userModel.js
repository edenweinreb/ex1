const crypto = require('crypto');

// In-memory data store for users
const users = [];

const createUser = (userData) => {
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

module.exports = {
    createUser,
    getUserById
};