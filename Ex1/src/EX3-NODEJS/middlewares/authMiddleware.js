const userModel = require('../models/userModel');

const requireAuth = (req, res, next) => {
    // Extract the user ID from a custom header named 'x-user-id'
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({ error: "Authentication required. Missing x-user-id header" });
    }

    // Verify the user actually exists in the database
    const user = userModel.getUserById(userId);
    
    if (!user) {
        return res.status(401).json({ error: "Invalid user ID" });
    }

    // Attach the user object to the request so the controller can use it later
    req.user = user;
    
    // Pass control to the next function (the controller)
    next();
};

module.exports = {
    requireAuth
};