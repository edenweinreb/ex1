const Restaurant = require('./models/restaurant');
const Product = require('./models/product');
const initialRestaurants = require('./controllers/initialData');

const seedDatabase = async () => {
    try {
        // Check if data already exists to prevent duplicate seeding on every restart
        const restaurantCount = await Restaurant.countDocuments();
        if (restaurantCount > 0) {
            console.log("Database already contains data. Skipping seeding.");
            return;
        }

        console.log("Starting database seeding...");
        let productNumericId = 1; // Counter for the TCP server requirement

        for (const rData of initialRestaurants) {
            // 1. Create the restaurant
            const newRestaurant = await Restaurant.create({
                name: rData.name,
                address: rData.address,
                description: rData.description,
                phone: rData.phone,
                cuisineType: rData.cuisineType,
                lat: rData.lat,
                lng: rData.lng,
                averageRating: rData.averageRating,
                image: rData.image
            });

            // 2. Create the products (menu items) linked to this restaurant
            if (rData.menu && rData.menu.length > 0) {
                for (const item of rData.menu) {
                    await Product.create({
                        numericId: productNumericId++,
                        restaurantId: newRestaurant._id, // Link to the created restaurant
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        image: item.image
                    });
                }
            }
        }
        
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

module.exports = seedDatabase;