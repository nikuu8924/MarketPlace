const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//router.get('/', productController.searchProductsByName);
// Routes for products
router.get('/search', productController.searchProductsByName);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);
router.delete('/', productController.deleteAllProducts);


module.exports = router;
