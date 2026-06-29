const Restaurant = require('../models/restaurant');
const Product = require('../models/product');

const search = async (req, res) => {
    try {
        const query = req.params.query;

        // Create a case-insensitive regular expression for partial matching
        const searchRegex = new RegExp(query, 'i');

        // Prepare the search condition: match either name OR description
        const searchCondition = {
            $or: [
                { name: { $regex: searchRegex } },
                { description: { $regex: searchRegex } }
            ]
        };

        // Run both searches concurrently to improve response time
        const [matchedRestaurants, matchedProducts] = await Promise.all([
            Restaurant.find(searchCondition),
            Product.find(searchCondition)
        ]);

        res.status(200).json({
            restaurants: matchedRestaurants,
            products: matchedProducts
        });
        
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Failed to perform search" });
    }
};

module.exports = { search };