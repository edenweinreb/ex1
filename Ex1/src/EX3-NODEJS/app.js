const express = require('express');
const app = express();
const port = 3000;

const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Temporary test route to verify the server is working
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
