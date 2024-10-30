const db = require('../config/db');

const employeesRepository = {

    getAllemployees: async () => {
        try {
            const [rows] = await db.query(
                `SELECT id, full_name, type, phone_number, salary, created_at FROM employees`
            );
            return rows;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getemployeeById: async (id) => {
        try {
            const [rows] = await db.query(
                `SELECT id, full_name, type, phone_number, created_at, salary FROM employees WHERE id = ?`,
                [id]
            );

            return rows[0];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    checkPhoneNumberExists: async (phone_number) => {
        const query = `SELECT id FROM employees WHERE phone_number = ?`;
        const [result] = await db.execute(query, [phone_number]);
        return result.length > 0;
    },

    checkPhoneNumberAndIdExists: async (phone_number, id) => {
        const query = `SELECT id FROM employees WHERE phone_number = ? AND id <> ?`;
        const [result] = await db.execute(query, [phone_number, id]);
        return result.length > 0;
    },

    createemployee: async (employeeData) => {
        try {
            const { full_name, password_hash, type, phone_number, salary } = employeeData;

            const [result] = await db.query(
                `INSERT INTO employees (full_name, password_hash, type, phone_number, salary) VALUES (?, ?, ?, ?, ?)`,
                [full_name, password_hash, type, phone_number, salary]
            );

            const [newEmployee] = await db.query(
                `SELECT id, full_name, type, phone_number, salary, created_at FROM employees WHERE id = ?`,
                [result.insertId]
            );

            return newEmployee[0];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateemployeeById: async (id, employeeData) => {
        try {
            const { full_name, password_hash, phone_number, type, salary } = employeeData;

            const [result] = await db.query(
                `UPDATE employees SET full_name = ?, password_hash = ?, phone_number = ?, type = ?, salary = ? WHERE id = ?`,
                [full_name, password_hash, phone_number, type, salary, id]
            );

            if (result.affectedRows === 0) {
                return null;
            }

            const [updatedEmployee] = await db.query(
                `SELECT id, full_name, phone_number, type, created_at FROM employees WHERE id = ?`,
                [id]
            );

            return updatedEmployee[0];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    deleteemployeeById: async (id) => {
        try {
            const [result] = await db.query(`DELETE FROM employees WHERE id = ?`, [id]);

            if (result.affectedRows === 0) {
                return null; 
            }

            return { message: "تم حذف حساب الموظف بنجاح" };
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    checkPhoneNumberExists: async (phone_number) => {
        const query = `SELECT id FROM employees WHERE phone_number = ?`;
        const [result] = await db.execute(query, [phone_number]);
        return result.length > 0;
    },

    checkPhoneNumberAndIdExists: async (phone_number, id) => {
        const query = `SELECT id FROM employees WHERE phone_number = ? AND id <> ?`;
        const [result] = await db.execute(query, [phone_number, id]);
        return result.length > 0;
    },
};

module.exports = employeesRepository;
