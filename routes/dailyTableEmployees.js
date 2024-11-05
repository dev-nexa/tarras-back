const express = require('express');
const router = express.Router();

const dailyTableEmployeesController = require('../controllers/dailyTableEmployeesController.js');
const { validateAssignTables } = require('../middlewares/dailyTableEmployeesMiddleware.js');

router.post('/assign-tables', validateAssignTables, dailyTableEmployeesController.assignTablesToEmployee);

// router.delete('/remove-tables', dailyTableEmployeesController.removeTablesFromEmployee);

module.exports = router;
