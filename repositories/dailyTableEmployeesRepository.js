const db = require('../config/db');

module.exports = {
    getAllTableByEmployeeId: async (employeeId) => {
        const query = 'SELECT table_id FROM daily_table_employee WHERE employee_id = ?';
        const [rows] = await db.execute(query, [employeeId]);
        return rows.map(row => row.table_id);
    },

    deletAllTableByMe: async (employeeId) => {
        const query = 'DELETE FROM daily_table_employee WHERE employee_id = ?';
        const [result] = await db.execute(query, [employeeId]);
        return result.affectedRows > 0;
    },

    assignTablesToEmployee: async (employeeId, tableIds) => {
        const query = 'INSERT INTO daily_table_employee (employee_id, table_id) VALUES (?, ?)';
        const promises = tableIds.map(tableId => db.execute(query, [employeeId, tableId]));
        await Promise.all(promises);
        return true;
    },

    tableIdsTaken: async (tableIds, employeeId) => {
        const query = `
            SELECT table_id 
            FROM daily_table_employee 
            WHERE table_id IN (${tableIds.map(() => '?').join(', ')}) AND employee_id != ?
        `;
        const [rows] = await db.execute(query, [...tableIds, employeeId]);
        return rows.length === 0;
    },

    deleteAllRows: async () => {
        try {
            const query = 'DELETE FROM daily_table_employee';
            const [result] = await db.execute(query);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting all rows:', error);
            throw error;
        }
    }
};
