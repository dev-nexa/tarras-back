const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const { validateId } = require('../middlewares/categoriesMiddleware');

router.post('/category', categoriesController.createCategory);

// router.get('/categories', categoriesController.getAllCategories);

router.get('/category/:id', validateId, categoriesController.getCategoryById);

// router.put('/category/:id', categoriesController.updateCategoryById);

// router.delete('/category/:id', categoriesController.deleteCategoryById);

module.exports = router;
