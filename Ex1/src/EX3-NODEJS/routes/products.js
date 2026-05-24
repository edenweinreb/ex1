const express = require('express');
// mergeParams allows access to :id from the parent router (restaurants)
const router = express.Router({ mergeParams: true });
const ctrl = require('../controllers/productController');

// GET /api/restaurants/:id/products - get all products for a restaurant
router.get('/', ctrl.getAllProducts);

// POST /api/restaurants/:id/products - add a new product
router.post('/', ctrl.createProduct);

// GET /api/restaurants/:id/products/:pId - get a single product
router.get('/:pId', ctrl.getProductById);

// PATCH /api/restaurants/:id/products/:pId - update a product
router.patch('/:pId', ctrl.updateProduct);

// DELETE /api/restaurants/:id/products/:pId - delete a product
router.delete('/:pId', ctrl.deleteProduct);

module.exports = router;