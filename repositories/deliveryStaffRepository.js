const db = require('../config/db');

const deliveryStaffRepository = {

    getAllStaff: async () => {
        try {
            const query = 'SELECT full_name, phone_number, availability_state, total_count FROM delivery_staff';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getStaffById: async (id) => {
        try {
            const query = 'SELECT full_name, phone_number, availability_state, total_count FROM delivery_staff WHERE id = ?';
            const [rows] = await db.execute(query, [id]);

            return rows[0] || null;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    createStaff: async (staffData) => {
        try {
            const query = `INSERT INTO delivery_staff (full_name, phone_number, password_hash) VALUES (?, ?, ?)`;
            const [result] = await db.execute(query, [
                staffData.full_name,
                staffData.phone_number,
                staffData.password_hash,
            ]);
            return result.insertId ? { id: result.insertId, full_name: staffData.full_name, phone_number: staffData.phone_number } : null;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    findStaffByPhoneNumber: async (phoneNumber) => {
        try {
            const query = `SELECT * FROM delivery_staff WHERE phone_number = ?`;
            const [rows] = await db.execute(query, [phoneNumber]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateStaffById: async (id, staffData) => {
        try {
            const query = `UPDATE delivery_staff SET full_name = ?, phone_number = ? WHERE id = ?`;
            const [result] = await db.execute(query, [
                staffData.full_name,
                staffData.phone_number,
                id,
            ]);

            return result;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateStaffPasswordById: async (id, hashedPassword) => {
        try {
            const query = 'UPDATE delivery_staff SET password_hash = ? WHERE id = ?';
            const [result] = await db.execute(query, [hashedPassword, id]);
            return result; 
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    updateStaffStatusById: async (id, status) => {
        try {
            const query = 'UPDATE delivery_staff SET availability_state = ? WHERE id = ?';
            const [result] = await db.execute(query, [status, id]);
            return result;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    deleteStaffById: async (id) => {
        try {
            const query = 'DELETE FROM delivery_staff WHERE id = ?';
            const [result] = await db.execute(query, [id]);

            return result;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getAvailableStaff: async () => {
        try {
            const query = 'SELECT full_name, phone_number, availability_state, total_count FROM delivery_staff WHERE availability_state = 1';
            const [rows] = await db.execute(query);

            return rows;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },
};

module.exports = deliveryStaffRepository;
