const express = require('express');
const router = express.Router();
const resarvationsController = require('./../controllers/resarvationsController');
const { validateResarvation } = require('../middlewares/resarvationsMiddleware.js');

router.post('/resarvation', validateResarvation, resarvationsController.createResarvation);

router.get('/resarvations', resarvationsController.getAllResarvations);

// router.get('/resarvation/:id', resarvationsController.getResarvationById);

// router.put('/resarvation/:id', resarvationsController.updateResarvationById);

// router.delete('/resarvation/:id', resarvationsController.deleteResarvationById);

module.exports = router;