const Product = require('../models/product');
const ex2Service = require('../services/socketClient');
const { restaurants } = require('./restaurantController');

// In-memory storage for all products
const products = [];

// Counter for numeric IDs to use with Ex2 (which uses integers)
let productCounter = 1;

// GET /api/restaurants/:id/products - get all products for a restaurant
const getAllProducts = (req, res) => {
// Filter products that belong to the restaurant
  const restaurantProducts = products.filter(p => p.restaurantId === req.params.id);
  res.status(200).json(restaurantProducts);
};

// POST /api/restaurants/:id/products - add a new product to a restaurant
const createProduct = (req, res) => {
  const { name, description, price } = req.body;

  // name and price are required
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!price) {
    return res.status(400).json({ error: 'Price is required' });
  }
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  const restaurantExists = restaurants.find(r => r.id === req.params.id);
  if (!restaurantExists) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }

  // Create product with both UUID (Ex3) and numeric ID (Ex2)
  const product = new Product(
    { name, description, price, restaurantId: req.params.id },
    productCounter++
  );
  products.push(product);

  // Return 201 Created with Location header
  res.status(201).location(`/api/restaurants/${req.params.id}/products/${product.id}`).send();
};

// GET /api/restaurants/:id/products/:pId - get a single product and notify Ex2
const getProductById = async (req, res) => {
  const product = products.find(p => p.id === req.params.pId && p.restaurantId === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Notify Ex2 that user viewed this product (userId comes from request header)
  const userId = req.headers['user-id'];
  if (userId) {
    await ex2Service.addViewedProduct(userId, product.numericId);
  }

  res.status(200).json(product);
};

// PATCH /api/restaurants/:id/products/:pId - update a product
const updateProduct = (req, res) => {
  const product = products.find(p => p.id === req.params.pId && p.restaurantId === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Only update fields that were actually sent (PATCH = partial update)
  const { name, description, price } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;

  res.status(204).send();
};

// DELETE /api/restaurants/:id/products/:pId - delete a product
const deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.pId && p.restaurantId === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(204).send();
};

module.exports = { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, products };