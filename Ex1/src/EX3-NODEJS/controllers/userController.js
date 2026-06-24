const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = process.env.JWT_SECRET || "some-secret-key";

const registerUser = async (req, res) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const userData = req.body;

    // Validate required fields
    if (!userData.name || !userData.password || !userData.address) {
        return res.status(400).json({ error: "Name, password, and address are required" });
    }

    // Validate user role
    if (!userData.role || !['user', 'owner'].includes(userData.role)) {
        return res.status(400).json({ error: "Role must be 'user' or 'owner'" });
    }

    // Validate location coordinates
    if (userData.lat === undefined || userData.lng === undefined) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // Create and save the new user
        const newUser = await userModel.createUser(userData);

        // Generate JWT token after successful registration
        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            key
        );

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(400).json({ error: "Username already exists" });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    // Validate user ID parameter
    if (!req.params || !req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const userId = req.params.id;
    const user = await userModel.getUserById(userId);

    // User not found
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
};

const loginUser = async (req, res) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, password } = req.body;

    // Validate credentials
    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    try {
        // Find user by username
        const user = await userModel.getUserByName(name);

        // Prevent revealing whether username exists
        if (!user) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        // Generate JWT token for authenticated user
        const token = jwt.sign(
            { id: user.id, role: user.role },
            key
        );

        // Return user information needed by the client
        res.status(200).json({
            token,
            role: user.role,
            lat: user.lat,
            lng: user.lng,
            id: user.id || user.name
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    registerUser,
    getUser,
    loginUser
};