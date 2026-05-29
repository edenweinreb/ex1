const express = require('express');
const app = express();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express.json());
const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);
// Temporary test route to verify the server is working
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Route all /api/restaurants requests to the restaurants router
app.use('/api/restaurants', require('./routes/restaurants'));

// Route all /api/restaurants/:id/products requests to the products router
app.use('/api/restaurants/:id/products', require('./routes/products'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

