const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locationsController.js');
const {
    validateLocation,
    validateLocationId,
} = require('../middlewares/locationsMiddleware');

router.post('/location', validateLocation, locationsController.createLocation);

router.get('/locations', locationsController.getAllLocations);

router.get('/location/:id', validateLocationId, locationsController.getLocationById);

router.put('/location/:id', validateLocationId, validateLocation, locationsController.updateLocationById);

router.delete('/location/:id', validateLocationId, locationsController.deleteLocationById);

module.exports = router;
