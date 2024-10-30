const express = require('express');
const router = express.Router();
const employeesController = require('./../controllers/employeesController');
const { validateEmployee, hashPassword, validateEmoloyeeId, validateEmoloyeeForUpdate} = require('./../middlewares/employeesMiddleware');

router.post('/employee', validateEmployee, hashPassword, employeesController.createemployee);

router.get('/employees', employeesController.getAllemployees);

router.get('/employee/:id', validateEmoloyeeId, employeesController.getemployeeById);

router.put('/employee/:id', validateEmoloyeeForUpdate, hashPassword, employeesController.updateemployeeById);

router.delete('/employee/:id', employeesController.deleteemployeeById);

module.exports = router;
