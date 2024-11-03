const express = require('express');
const router = express.Router();
const deliveryStaffController = require('./../controllers/deliveryStaffController');
const { validateDeliveryStaff, validateDeliveryStaffPassword, hashPassword, validateDeliveryStaffId, validateDeliveryStaffForStatusUpdate, validateDeliveryStaffForUpdate } = require('../middlewares/deliveryStaffMiddleware');

router.get('/delivery-staff', deliveryStaffController.getAllStaff);

router.get('/delivery-staff/:id', validateDeliveryStaffId, deliveryStaffController.getStaffById);

router.post('/delivery-staff', validateDeliveryStaff, hashPassword, deliveryStaffController.createStaff);

router.put('/delivery-staff/:id', validateDeliveryStaffForUpdate, deliveryStaffController.updateStaffById);

router.put('/delivery-staff-password/:id', validateDeliveryStaffPassword, validateDeliveryStaffId, hashPassword, deliveryStaffController.updateStaffPasswordById);

router.put('/delivery-staff-status/:id/:status', validateDeliveryStaffId, validateDeliveryStaffForStatusUpdate, deliveryStaffController.updateStaffStatusById);

router.delete('/delivery-staff/:id', validateDeliveryStaffId, deliveryStaffController.deleteStaffById);

router.get('/deliverystaff/available', deliveryStaffController.getAvailableStaff);

module.exports = router;
