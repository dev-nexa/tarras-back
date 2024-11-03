const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const { validateId, validateCategory } = require('../middlewares/categoriesMiddleware');

router.post('/category', validateCategory, categoriesController.createCategory);

router.get('/categories', categoriesController.getAllCategories);

router.get('/category/:id', validateId, categoriesController.getCategoryById);

router.put('/category/:id', validateId, validateCategory, categoriesController.updateCategoryById);

router.delete('/category/:id', validateId, categoriesController.deleteCategoryById);

module.exports = router;
