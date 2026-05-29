const { restaurantsDatabase } = require('./restaurantController');
const { productsDatabase } = require('./productController');

const search = (req, res) => {
    const query = req.params.query.toLowerCase();

    const matchedRestaurants = restaurantsDatabase.filter(restaurant => {
        const nameMatch = restaurant.name?.toLowerCase().includes(query);
        const descMatch = restaurant.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
    })

    const matchedProducts = productsDatabase.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
    })

    res.status(200).json({
        restaurants: matchedRestaurants,
        products: matchedProducts
      });
}

module.exports = { search };