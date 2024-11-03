const express = require('express');
const router = express.Router();
const productsController = require('./../controllers/productController');
const { validateProduct, validateUpdateProduct, validateCategoryId, validateState, validateProductId } = require('../middlewares/productMiddleware');
const upload = require("../middlewares/uploadProductImage");

router.post('/products', upload, validateProduct, productsController.createProduct);

router.get('/products/:state', validateState, productsController.getAllProducts);

router.get('/product/:id', validateProductId, productsController.getProductById);

router.put('/product/:id', upload, validateProductId, validateUpdateProduct, productsController.updateProductById);

router.delete('/deleteproduct/:id', validateProductId, productsController.deleteProductById);

router.get('/products/category/:category', validateCategoryId, productsController.getProductsByCategory);

module.exports = router;
