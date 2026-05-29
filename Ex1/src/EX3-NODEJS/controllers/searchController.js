const { restaurants } = require('../controllers/restaurantController');
const { products } = require('../controllers/productController');

const search = (req, res) => {
    const query = req.params.query.toLowerCase();

    if (!restaurants || !products) {
        console.error("Database is missing! Check imports.");
        return res.status(500).json({ error: "Database not initialized" });
    }

    const matchedRestaurants = restaurants.filter(restaurant => {
        const nameMatch = restaurant.name?.toLowerCase().includes(query);
        const descMatch = restaurant.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
    });

    const matchedProducts = products.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
    });

    res.status(200).json({
        restaurants: matchedRestaurants,
        products: matchedProducts
    });
}

module.exports = { search };