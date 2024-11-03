const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customerController');
const { 
    validateCustomer, 
    hashPassword, 
    validateCustomerId, 
    validateCustomerPhone, 
    validateCustomerName, 
    validateCustomerForUpdate,
    validateCustomerUpdatePassword
} = require('../middlewares/customerMiddleware');

router.post('/customers', validateCustomer, hashPassword, customerController.createCustomer);

router.get('/customers', customerController.getAllCustomers);

router.get('/customer/:id', validateCustomerId, customerController.getCustomerById);

router.get('/customers/blocked', customerController.getAllBlockedCustomers);

router.get('/customers/unblocked', customerController.getAllUnblockedCustomers);

router.get('/customers-phone/:phone', validateCustomerPhone, customerController.getCustomerByPhoneNumber);

router.get('/customers-name/:name', validateCustomerName, customerController.getCustomerByName);

router.put('/customers/:id', validateCustomerForUpdate, customerController.updateCustomerById);

router.put('/customer-password/:id', validateCustomerUpdatePassword, hashPassword, customerController.updateCustomerPasswordById);

router.delete('/customers/:id', validateCustomerId, customerController.deleteCustomerById);

module.exports = router;