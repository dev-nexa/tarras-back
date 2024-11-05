const express = require('express');
const router = express.Router();

const employeesTypesController = require('../controllers/employeesTypesController');
const { validateCreateType, validateTypeId, validateUpdateType } = require('../middlewares/employeesTypesMiddleware');

router.post('/employees-type', validateCreateType, employeesTypesController.createType);

router.get('/employees-types', employeesTypesController.getAllTypes);

router.get('/employees-type/:id', validateTypeId, employeesTypesController.getTypeById);

router.put('/employees-type/:id', validateTypeId, validateUpdateType, employeesTypesController.updateTypeById);

router.delete('/employees-type/:id', validateTypeId, employeesTypesController.deleteTypeById);

module.exports = router;
