const express = require('express');
// mergeParams allows access to :id from the parent router (restaurants)
const router = express.Router({ mergeParams: true });
const ctrl = require('../controllers/productController');

const { requireAuth } = require('../controllers/userController');

router.get('/', ctrl.getAllProducts);
router.get('/:pId', ctrl.getProductById);

router.post('/', requireAuth, ctrl.createProduct);
router.patch('/:pId', requireAuth, ctrl.updateProduct);
router.delete('/:pId', requireAuth, ctrl.deleteProduct);

module.exports = router;