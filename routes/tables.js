const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');
const { 
    validateTable, 
    validateTableId, 
    validateTableQrCode,
    validateTableState
 } = require('../middlewares/tablesMiddleware');

 router.post('/tables', validateTable, tableController.createTable);
 
 router.get('/tables', tableController.getAllTables);
 
 router.get('/table/:id', validateTableId, tableController.getTableById);

 router.get('/tableqrcode/:qrcode', validateTableQrCode, tableController.getTableByQRCode);

 router.get('/table-locations', tableController.getTablelocation);
 
 router.put('/table/:id', validateTable, tableController.updateTableById);
 
 router.put('/reset-tables', tableController.resetTables);
 
 router.put('/change-table-state/:id/:state', validateTableId, validateTableState, tableController.updateTableState);
 
 router.delete('/table/:id', validateTableId, tableController.deleteTableById);

module.exports = router;
