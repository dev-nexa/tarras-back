const db = require('../config/db');

const productRepository = {

  getAllProducts: async (state) => {
    try {
      let rows;

      if (state === "1") {
        [rows] = await db.query("SELECT * FROM products WHERE status = 1");
      } else if (state === "0") {
        [rows] = await db.query("SELECT * FROM products WHERE status = 0");
      } else if (state === "2") {
        [rows] = await db.query("SELECT * FROM products");
      } else {
        return -1;
      }

      return rows; // Only return the rows array
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {

    } catch (error) {

    }
  },

  createProduct: async (productData) => {
    try {
      const { id, product_name, description, price, category_id, calories, image_path, status } = productData;

      const [check] = await db.query(
        `SELECT id from products WHERE id = ?`,
        [id]
      );
      if (check.length !== 0) {
        return -1;
      }

      const [result] = await db.query(
        `INSERT INTO products (id, product_name, description, price, category_id, calories, image_path, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, product_name, description, price, category_id, calories, image_path, status]
      );

      const [newProduct] = await db.query(
        `SELECT id, product_name, description, price, category_id, calories, image_path, status 
              FROM products WHERE id = ?`,
        [result.insertId]
      );

      return newProduct[0];
    } catch (error) {
      console.error("Database error:", error);
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

module.exports = productRepository;
