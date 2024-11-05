const db = require('../config/db');

const typesRepository = {
    createType: async (name) => {
        const query = 'INSERT INTO employees_type (name) VALUES (?)';
        const [result] = await db.execute(query, [name]);
        if(result.affectedRows > 0) {
            return result;
        }
        return false;
    },

    getAllTypes: async () => {
        const query = 'SELECT * FROM employees_type';
        const [rows] = await db.execute(query);
        return rows;
    },

    getTypeById: async (id) => {
        const query = 'SELECT * FROM employees_type WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    updateTypeById: async (id, name) => {
        const query = 'UPDATE employees_type SET name = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, id]);
        return result;
    },

    deleteTypeById: async (id) => {
        const query = 'DELETE FROM employees_type WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

module.exports = typesRepository;
