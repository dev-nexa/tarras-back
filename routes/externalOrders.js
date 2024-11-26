const express = require('express');
const router = express.Router();
const externalOrderController = require('../controllers/externalOrderController');
const {
    validateCreateOrder,
    validateStateBody,
    validateOrderIdParam,
    validateCustomerIdParam,
} = require('../middlewares/externalOrderMiddleware');

router.post('/external-order', validateCreateOrder, externalOrderController.createOrder);
router.get('/external-orders', validateStateBody, externalOrderController.getAllOrders);
router.get('/external-orders-by-id/:id', validateOrderIdParam, externalOrderController.getOrderById);
router.get('/external-orders-by-customer-id/:customerId', validateCustomerIdParam, externalOrderController.getOrdersByCustomerId);
router.put('/external-order/:id', validateStateBody, validateOrderIdParam, externalOrderController.UpdateOrderStateById);

module.exports = router;
