const express = require('express');
const router = express.Router();
const employeesController = require('./../controllers/employeesController');
const { 
    hashPassword, 
    validateEmployee, 
    validateEmoloyeeId, 
    validateEmoloyeeType,
    validateEmoloyeeForUpdate,
    validateEmoloyeePasswordForUpdate
} = require('./../middlewares/employeesMiddleware');

router.post('/employee', validateEmployee, hashPassword, employeesController.createemployee);

router.get('/employees', employeesController.getAllemployees);

router.get('/employee/:id', validateEmoloyeeId, employeesController.getemployeeById);

router.get('/employees/:type', validateEmoloyeeType, employeesController.getemployeeByType);

router.put('/employee/:id', validateEmoloyeeForUpdate, employeesController.updateemployeeById);

router.put('/employee-password/:id', validateEmoloyeePasswordForUpdate, hashPassword, employeesController.updateemployeePasswordById);

router.delete('/employee/:id', validateEmoloyeeId, employeesController.deleteemployeeById);

module.exports = router;
