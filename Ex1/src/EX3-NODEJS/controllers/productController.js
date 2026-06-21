const Product = require('../models/product');
const Restaurant = require('../models/restaurant');
const ex2Service = require('../services/socketClient'); 

// GET /api/restaurants/:id/products - get all products for a restaurant
const getAllProducts = async (req, res) => {
  try {
    // Find all products that reference this specific restaurant ID
    const restaurantProducts = await Product.find({ restaurantId: req.params.id });
    res.status(200).json(restaurantProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// POST /api/restaurants/:id/products - add a new product to a restaurant
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validation
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!price) return res.status(400).json({ error: 'Price is required' });
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    // Verify the restaurant exists in the DB
    const restaurantExists = await Restaurant.findById(req.params.id);
    if (!restaurantExists) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Auto-increment logic for numericId (find the highest numericId currently in DB)
    const lastProduct = await Product.findOne().sort('-numericId');
    const nextNumericId = lastProduct && lastProduct.numericId ? lastProduct.numericId + 1 : 1;

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      restaurantId: req.params.id,
      numericId: nextNumericId
    });

    // Return 201 Created with Location header using the Mongoose _id
    res.status(201).location(`/api/restaurants/${req.params.id}/products/${product._id}`).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// GET /api/restaurants/:id/products/:pId - get a single product and notify Ex2
const getProductById = async (req, res) => {
  try {
    // Find product matching BOTH the product ID and the restaurant ID
    const product = await Product.findOne({ _id: req.params.pId, restaurantId: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Notify Ex2 that user viewed this product (using x-user-id header as per your auth setup)
    const userId = req.headers['x-user-id']; 
    if (userId) {
      // Pass the integer numericId to Ex2, not the MongoDB ObjectId
      await ex2Service.addViewedProduct(userId, product.numericId);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
};

// PATCH /api/restaurants/:id/products/:pId - update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    // Create an update object dynamically based on provided fields
    const updates = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (price) updates.price = price;

    // Find by BOTH product ID and restaurant ID, and update
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.pId, restaurantId: req.params.id },
      updates,
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE /api/restaurants/:id/products/:pId - delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ 
        _id: req.params.pId, 
        restaurantId: req.params.id 
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = { 
    getAllProducts, 
    createProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct 
};