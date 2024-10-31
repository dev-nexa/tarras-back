const db = require('../config/db');

const productRepository = {
    createCategory: async (categoryData) => {
        try {
            const query = "INSERT INTO categories (name) VALUES (?)";
            const [result] = await db.query(query, [categoryData.name]);
    
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getAllCategories: async (state) => {
        try {

        } catch (error) {
        }
    },

    getCategoryById: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },


    updateCategoryById: async (id, productData) => {
        try {

        } catch (error) {

        }
    },

    deleteCategoryById: async (id) => {
        try {

        } catch (error) {

        }
    },

    getCategoriesByCategory: async (category) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = productRepository;
