const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant'); 
const initialRestaurants = require('./controllers/initialData');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://mongodb:27017/my_database'; 
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    const count = await Restaurant.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Seeding initial restaurants...');
      await Restaurant.insertMany(initialRestaurants);
      console.log('Successfully seeded database with initial data!');
    } else {
      console.log(`Database already has ${count} restaurants. Skipping seed.`);
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;