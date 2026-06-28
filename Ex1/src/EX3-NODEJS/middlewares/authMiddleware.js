const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    try {
        // Extract the user ID from a custom header named 'x-user-id'
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({ error: "Authentication required. Missing x-user-id header" });
        }

        // Verify the user actually exists in the database
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(401).json({ error: "Invalid user ID" });
        }

        // Attach the user object to the request so the controller can use it later
        req.user = user;
        
        // Pass control to the next function (the controller)
        next();
    } catch (error) {
        // Catch invalid MongoDB ObjectIds and other errors
        return res.status(500).json({ error: "Server error during authentication" });
    }
};

module.exports = {
    requireAuth
};