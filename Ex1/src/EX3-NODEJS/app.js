const express = require('express');
const app = express();
const port = 3000;

const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Enable the server to parse incoming JSON requests
app.use(express.json());

app.use('/api', orderRoutes);
app.use('/api', searchRoutes);

// Temporary test route to verify the server is working
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});