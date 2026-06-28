const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET || "some-secret-key";

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const userData = req.body;
    
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
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    if (!req.params || !req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        // Catch CastError if the provided ID is not a valid MongoDB ObjectId
        return res.status(500).json({ error: "Invalid ID format or server error" });
    }
};

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    try {
        const user = await User.findOne({ name: name, password: password });

        if (!user) {
            return res.status(404).json({ error: "Invalid username or password" }); 
        }

        const token = jwt.sign({ id: user._id, role: user.role }, key);
 
        res.status(200).json({
            token,
            role: user.role,
            lat: user.lat,
            lng: user.lng,
            id: user._id
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error during login" });
    }
};

// Middleware to protect routes
const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        
        req.user = decoded; 
        next();
    });
};

module.exports = {
    registerUser,
    getUser,
    loginUser,
    requireAuth
};