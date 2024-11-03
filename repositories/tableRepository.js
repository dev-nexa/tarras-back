const db = require('../config/db');

const tableRepository = {

    getAllTables: async () => {
        try {
            const query = 'SELECT * FROM tables';
            const [tables] = await db.query(query);
            return tables;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getTableById: async (id) => {
        try {
            const query = 'SELECT * FROM tables WHERE id = ?';
            const [results] = await db.query(query, [id]);
            return results[0] || null;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    createTable: async (tableData) => {
        try {
            const query = `
                INSERT INTO tables (qr_code, details, number_of_people, table_number)
                VALUES (?, ?, ?, ?)
            `;

            const queryForQr = 'SELECT * FROM tables WHERE qr_code = ?';
            const [qr] = await db.query(queryForQr, [tableData.qr_code]);

            const queryForTebleNumber = 'SELECT * FROM tables WHERE table_number = ?';
            const [number] = await db.query(queryForTebleNumber, [tableData.table_number]);

            if (qr.length > 0) {
                return -1;
            }

            if (number.length > 0) {
                return -2;
            }

            const [result] = await db.execute(query, [
                tableData.qr_code,
                tableData.details,
                tableData.number_of_people,
                tableData.table_number
            ]);

            return { id: result.insertId, ...tableData };
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateTableById: async (id, tableData) => {
        try {
            const query = `
                UPDATE tables 
                SET qr_code = ?, details = ?, number_of_people = ?, table_number = ?
                WHERE id = ?
            `;
            const values = [
                tableData.qr_code,
                tableData.details,
                tableData.number_of_people,
                tableData.table_number,
                id
            ];
    
            const [result] = await db.query(query, values);
    
            if (result.affectedRows === 0) {
                return null; 
            }
    
            return await tableRepository.getTableById(id);
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    deleteTableById: async (id) => {
        try {
            const query = 'DELETE FROM tables WHERE id = ?';
            const [result] = await db.query(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    getTableByQRCode: async (qrCode) => {
        try {
            const query = 'SELECT * FROM tables WHERE qr_code = ?';
            const [rows] = await db.query(query, [qrCode]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    findByQrCode: async (qr_code) => {
        try {
            const query = 'SELECT * FROM tables WHERE qr_code = ?';
            const [rows] = await db.query(query, [qr_code]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },
    
    findByTableNumber: async (table_number) => {
        try {
            const query = 'SELECT * FROM tables WHERE table_number = ?';
            const [rows] = await db.query(query, [table_number]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = tableRepository;
