const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customerController');

router.get('/customers', customerController.getAllCustomers);

// router.get('/customers/:id', customerController.getCustomerById);

// router.get('/customers/blocked', customerController.getAllBlockedCustomers);

// router.get('/customers/unblocked', customerController.getAllUnblockedCustomers);

// router.get('/customers/phone/:phone', customerController.getCustomerByPhoneNumber);

// router.get('/customers/name/:name', customerController.getCustomerByName);

// router.post('/customers', customerController.createCustomer);

// router.put('/customers/:id', customerController.updateCustomerById);

// router.delete('/customers/:id', customerController.deleteCustomerById);

// router.put('/customers/:id/block', customerController.blockCustomer);

// router.put('/customers/:id/unblock', customerController.unblockCustomer);

module.exports = router;
