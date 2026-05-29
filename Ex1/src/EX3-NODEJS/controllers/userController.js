const userModel = require('../models/userModel');

const registerUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const userData = req.body;
    
    if (!userData.name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newUser = userModel.createUser(userData);
    res.status(201).json(newUser);
};

const getUser = (req, res) => {
    if (!req.params || !req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const userId = req.params.id;
    const user = userModel.getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
};

const loginUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    const user = userModel.authenticateUser(name, password);

    if (!user) {
        return res.status(404).json({ error: "Invalid username or password" }); 
    }

    res.status(200).json({ id: user.id });
};

module.exports = {
    registerUser,
    getUser,
    loginUser 
};