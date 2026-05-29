const express = require('express');
const app = express();
const port = 3000;

const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', orderRoutes);
app.use('/api', searchRoutes);


const tokenRoutes = require('./routes/tokenRoutes');
app.use('/api/tokens', tokenRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});