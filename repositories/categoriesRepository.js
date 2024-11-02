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

    getAllCategories: async () => {
        try {
            const query = "SELECT * FROM categories";
            const [rows] = await db.execute(query);

            return rows;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
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

    updateCategoryById: async (id, categoryData) => {
        try {
            const query = "UPDATE categories SET name = ? WHERE id = ?";
            await db.execute(query, [categoryData.name, id]);

            const [result] = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);

            return result[0];
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    deleteCategoryById: async (id) => {
        try {
            const query = "DELETE FROM categories WHERE id = ?";
            const [result] = await db.execute(query, [id]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    },

    getCategoriesByCategory: async (category) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = productRepository;
