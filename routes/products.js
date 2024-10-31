const express = require('express');
const router = express.Router();
const productsController = require('./../controllers/productController');
const { validateProduct, validateState } = require('../middlewares/productMiddleware');
const upload = require("../middlewares/uploadProductImage");

router.post('/products', upload, validateProduct, productsController.createProduct);

router.get('/products/:state', validateState, productsController.getAllProducts);

// router.get('/products/:id', productsController.getProductById);

// router.put('/products/:id', productsController.updateProductById);

// router.delete('/products/:id', productsController.deleteProductById);

// router.get('/products/category/:category', productsController.getProductsByCategory);

module.exports = router;
