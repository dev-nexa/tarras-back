const db = require('../config/db');

const resarvationsRepository = {

    getAllResarvations: async () => {
        try {
            const query = `
                SELECT 
                    r.id AS reservation_id, 
                    t.table_number AS table_number, 
                    c.full_name AS customer_name, 
                    r.time_of_resarvation, 
                    r.family_or_not, 
                    r.details
                FROM resarvations r
                LEFT JOIN customers c ON r.customer_id = c.id
                LEFT JOIN tables t ON r.table_id = t.id
                ORDER BY r.time_of_resarvation DESC;
            `;
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
          
        } catch (error) {
            
        }
    },

    createResarvation: async (resarvationData) => {
        try {
            const query = `
                INSERT INTO resarvations (customer_id, table_id, time_of_resarvation, family_or_not, details)
                VALUES (?, ?, ?, ?, ?)
            `;
            const { customer_id, table_id, time_of_resarvation, family_or_not, details } = resarvationData;

            const [result] = await db.execute(query, [
                customer_id,
                table_id,
                time_of_resarvation,
                family_or_not,
                details,
            ]);
            return result;
        } catch (error) {
            console.error('Error inserting reservation:', error);
            throw error;
        }
    },

    updateProductById: async (id, productData) => {
        try {
            
        } catch (error) {
            
        }
    },

    deleteProductById: async (id) => {
        try {

        } catch (error) {

        }
    },

    getProductsByCategory: async (category) => {
        try {
            
        } catch (error) {

        }
    }

};

module.exports = resarvationsRepository;
