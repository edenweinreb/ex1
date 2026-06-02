const express = require('express');
const app = express();
const port = 3000;

app.disable('etag');
app.use((req, res, next) => {
  res.removeHeader('Date');
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());
const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use('/api/orders', orderRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

// Route all /api/restaurants requests to the restaurants router
app.use('/api/restaurants', require('./routes/restaurants'));

// Route all /api/restaurants/:id/products requests to the products router
app.use('/api/restaurants/:id/products', require('./routes/products'));


// Temporary test route to verify the server is working
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

