const tableRepository = require('../repositories/tableRepository');
const dailyTableEmployeesRepository = require('../repositories/dailyTableEmployeesRepository');

const tableController = {

    getAllTables: async (req, res) => {
        try {
            const tables = await tableRepository.getAllTables();
            res.status(200).json({
                message: 'تم جلب كل الطاولات بنجاح',
                tables: tables
            });
        } catch (error) {
            console.error("Error fetching tables:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    getTableById: async (req, res) => {
        try {
            const tableId = req.params.id;
            const table = await tableRepository.getTableById(tableId);

            if (!table) {
                return res.status(404).json({
                    message: 'لا يوجد طاولة تحمل هذا المعرف'
                });
            }

            res.status(200).json({
                message: 'تم جلب معلومات الطاولة بنجاح',
                table: table
            });
        } catch (error) {
            console.error("Error fetching table:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    createTable: async (req, res) => {
        try {
            const tableData = req.body;

            const newTable = await tableRepository.createTable(tableData);

            if (newTable == -1) {
                return res.status(400).json({ message: 'QR code already exists' });
            }
            else if (newTable == -2) {
                return res.status(400).json({ message: 'Table number already exists' });
            }

            res.status(201).json({
                message: 'تم إنشاء الطاولة بنجاح',
                table: newTable
            });
        } catch (error) {
            console.error("Error creating table:", error);
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    updateTableById: async (req, res) => {
        try {
            const tableId = req.params.id;
            const tableData = req.body;
            const { qr_code, table_number, ...otherData } = req.body;

            const existingTable = await tableRepository.getTableById(tableId);
            if (!existingTable) {
                return res.status(404).json({
                    message: 'لا يوجد طاولة تحمل هذا المعرف'
                });
            }

            const duplicateQrCode = await tableRepository.findByQrCode(qr_code);
            const duplicateTableNumber = await tableRepository.findByTableNumber(table_number);

            if (duplicateQrCode && (duplicateQrCode.id != tableId)) {
                return res.status(400).json({ message: 'ال qr code موجود بالفعل على طاولة اخرى' });
            }

            if (duplicateTableNumber && (duplicateTableNumber.id != tableId)) {
                return res.status(400).json({ message: 'رقم الطاولة موجود بالفعل على طاولة اخرى' });
            }

            const updatedTable = await tableRepository.updateTableById(tableId, tableData);

            res.status(200).json({
                message: 'تم تعديل معلومات الطاولة بنجاح',
                table: updatedTable
            });
        } catch (error) {
            console.error("Error updating table:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    resetTables: async (req, res) => {
        try {
            const resetTables = await tableRepository.resetTables();
            await dailyTableEmployeesRepository.deleteAllRows();
            
            if(resetTables == -1) {
                return res.status(400).json({
                    message: 'حدث خطأ بإعادة ترتيب الطاولات'
                });
            }
            res.status(200).json({
                message: 'تم إعادة ترتيبب الطاولات بنجاح'
            });
        } catch (error) {
            console.error("Error updating table:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    deleteTableById: async (req, res) => {
        try {
            const tableId = req.params.id;

            const existingTable = await tableRepository.getTableById(tableId);
            if (!existingTable) {
                return res.status(404).json({ message: 'لا يوجد طاولة تحمل هذا المعرف' });
            }

            const result = await tableRepository.deleteTableById(tableId);
            if (result) {
                res.status(200).json({ message: 'تم حذف الطاولة بنجاح' });
            } else {
                res.status(500).json({ message: 'فشل حذف الطاولة' });
            }
        } catch (error) {
            console.error("Error deleting table:", error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    getTableByQRCode: async (req, res) => {
        try {
            const qrCode = req.params.qrcode;

            const table = await tableRepository.getTableByQRCode(qrCode);

            if (table) {
                res.status(200).json({
                    message: 'تم جلب معلومات الطاولة بنجاح',
                    table
                });
            } else {
                res.status(404).json({
                    message: 'لا يوجد طاولة تحمل هذا ال qr code'
                });
            }
        } catch (error) {
            console.error("Error retrieving table:", error);
            res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    updateTableState: async (req, res) => {
        try {
            const { state, id } = req.params;

            const table = await tableRepository.getTableById(id);
            if (!table) {
                res.status(404).json({
                    message: 'لا يوجد طاولة تحمل هذا المعرف'
                });
            } 

            const result = await tableRepository.updateTableState(id, state);
            if(result) {
                res.json({
                    message: 'تم تغيير حالة الطاولة'
                });
            } else {
                res.status(400).json({
                    message: 'حدث خطأ'
                });
            }

        } catch (error) {
            console.error("Error retrieving table:", error);
            res.status(500).json({
                message: "Server error",
                error
            });
        }
    }
};

module.exports = tableController;
