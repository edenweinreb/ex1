const userModel = require('../models/userModel');

const registerUser = (req, res) => {
    const userData = req.body;
    
    // Basic validation
    if (!userData.name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newUser = userModel.createUser(userData);
    res.status(201).json(newUser);
};

const getUser = (req, res) => {
    const userId = req.params.id;
    const user = userModel.getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
};

module.exports = {
    registerUser,
    getUser
};