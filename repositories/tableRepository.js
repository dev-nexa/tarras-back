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
                INSERT INTO tables (qr_code, details, number_of_people, table_number, location)
                VALUES (?, ?, ?, ?, ?)
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
                tableData.table_number,
                tableData.location
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
                SET qr_code = ?, details = ?, number_of_people = ?, table_number = ?, location = ?
                WHERE id = ?
            `;
            const values = [
                tableData.qr_code,
                tableData.details,
                tableData.number_of_people,
                tableData.table_number,
                tableData.location,
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

    updateTableState: async (id, state) => {
        try {
            const query = `
                UPDATE tables 
                SET open_close = ?
                WHERE id = ?
            `;
            const values = [ state, id ];
    
            const [result] = await db.query(query, values);
    
            if (result.affectedRows === 0) {
                return null; 
            }
    
            return true;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateTableStatus: async (tableIds) => {
        try {
            if (tableIds.length === 0) {
                throw new Error("No table IDs provided for update.");
            }
            
            const query = `UPDATE tables SET is_taken = 1 WHERE id IN (${tableIds.map(() => '?').join(', ')})`;
            const [result] = await db.execute(query, [...tableIds]);
            
            return result;
        } catch (error) {
            console.error('Error updating table status:', error);
            throw error;
        }
    },

    resetTables: async () => {
        try {
            const query = 'UPDATE tables SET is_taken = 0';
            const [result] = await db.execute(query);
            return result.affectedRows ? result : -1;
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
    },

    tableIdsExist: async (tableIds) => {
        const query = `SELECT id FROM tables WHERE id IN (${tableIds.map(() => '?').join(', ')})`;
        const [rows] = await db.execute(query, tableIds);        
        const existingTableIds = rows.map(row => row.id);
        return tableIds.every(id => existingTableIds.includes(id));
    },

    updateTableTakenByEmloyeeId: async (tableIds) => {
        if (tableIds.length === 0) return;
    
        const placeholders = tableIds.map(() => '?').join(', ');
        const query = `UPDATE tables SET is_taken = 0 WHERE id IN (${placeholders})`;
    
        await db.execute(query, [...tableIds]);
    },

    updateTableTaken: async (tableIds) => {
        if (tableIds.length === 0) return;
    
        const placeholders = tableIds.map(() => '?').join(', ');
        const query = `UPDATE tables SET is_taken = 1 WHERE id IN (${placeholders})`;
    
        await db.execute(query, tableIds);
    },

    getAllUniqueLocations: async () => {
        try {
            const query = 'SELECT DISTINCT location FROM tables';
            const [rows] = await db.execute(query);
            return rows.map(row => row.location);
        } catch (error) {
            console.error('Error fetching unique locations:', error);
            throw error;
        }
    },
};

module.exports = tableRepository;
