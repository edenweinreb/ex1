const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET || "some-secret-key";

const registerUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const userData = req.body;
    
    if (!userData.name) {
        return res.status(400).json({ error: "Name is required" });
    }

    if (!userData.name || !userData.password || !userData.address) {
        return res.status(400).json({ error: "Name, password, and address are required" });
    }

    if (!userData.role || !['user', 'owner'].includes(userData.role)) {
        return res.status(400).json({ error: "Role must be 'user' or 'owner'" });
    }

    if (userData.lat === undefined || userData.lng === undefined) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        // Add the user
        const newUser = userModel.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        // Catch the specific error coming from the model
        if (error.message === 'Username already exists') {
            return res.status(400).json({ error: "Username already exists" });
        }
        // General server error if something else went wrong
        return res.status(500).json({ error: "Internal server error" });
    }
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

    // Create JWT including role so protected routes can check permissions
    const token = jwt.sign({ id: user.id, role: user.role }, key);
 
    // Return token + role + lat/lng so the client can save them
    res.status(200).json({
        token,
        role: user.role,
        lat: user.lat,
        lng: user.lng,
        id: user.id || user.name
    });
};

module.exports = {
    registerUser,
    getUser,
    loginUser 
};