const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');
const { validateTable, validateTableId } = require('../middlewares/tablesMiddleware');

router.get('/tables', tableController.getAllTables);

router.get('/table/:id', validateTableId, tableController.getTableById);

router.post('/tables', validateTable, tableController.createTable);

router.put('/table/:id', validateTable, tableController.updateTableById);

router.delete('/table/:id', validateTableId, tableController.deleteTableById);

// router.get('/tables/qrcode/:qrCode', tableController.getTableByQRCode);

module.exports = router;
