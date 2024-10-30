const db = require('../config/db');

const customerRepository = {

  getAllCustomers: async () => {
    let connection;
    try {
      connection = await db.getConnection();
      const [rows] = await connection.query("SELECT * FROM customers");
      return rows;
    } catch (error) {
      throw new Error("فشل في جلب بيانات المستخدمين " + error.message);
    }
  },

  getCustomerById: async (id) => {
    let connection;
    try {
      connection = await db.getConnection();
      const query = "SELECT full_name, phone_number, is_blocked, created_at FROM customers WHERE id = ?";
      const [rows] = await connection.execute(query, [id]);
      connection.release();
      if (rows.length === 0) {
        return -1;
      }
      return rows[0];

    } catch (error) {
      throw new Error("فشل في جلب بيانات المستخدمين " + error.message);
    }
  },

  getAllBlockedCustomers: async () => {
    try {
      const [rows] = await db.query(
        'SELECT full_name, phone_number, created_at FROM customers WHERE is_blocked = TRUE'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getAllUnblockedCustomers: async () => {
    try {
      const [rows] = await db.query(
        'SELECT full_name, phone_number, created_at FROM customers WHERE is_blocked = FALSE'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getCustomerByPhoneNumber: async (phone) => {
    try {
      const [rows] = await db.query(
        'SELECT full_name, phone_number, is_blocked, created_at FROM customers WHERE phone_number = ?',
        [phone]
      );
      if (rows.length === 0) {
        return -1;
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },


  checkPhoneNumberExists: async (phone_number) => {
    const query = `SELECT id FROM customers WHERE phone_number = ?`;
    const [result] = await db.execute(query, [phone_number]);
    return result.length > 0;
  },

  checkPhoneNumberAndIdExists: async (phone_number, id) => {
    const query = `SELECT id FROM customers WHERE phone_number = ? AND id <> ?`;
    const [result] = await db.execute(query, [phone_number, id]);
    return result.length > 0;
  },

  createCustomer: async (customerData) => {
    try {
      const { full_name, phone_number, password_hash } = customerData;

      const query = `
            INSERT INTO customers (full_name, phone_number, password_hash)
            VALUES (?, ?, ?)
        `;
      const [result] = await db.execute(query, [full_name, phone_number, password_hash]);

      const [customer] = await db.execute(`
            SELECT full_name, phone_number
            FROM customers
            WHERE id = ?
        `, [result.insertId]);

      return customer[0];
    } catch (error) {
      throw new Error("فشل في انشاء مستخدم جديد" + error.message);
    }
  },

  getCustomerByName: async (name) => {
    try {
      const [rows] = await db.query(
        `SELECT full_name, phone_number, is_blocked, created_at 
             FROM customers 
             WHERE full_name LIKE ?`,
        [`%${name}%`]
      );
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  updateCustomerById: async (id, customerData) => {
    try {
      const [result] = await db.query(
        `UPDATE customers SET full_name = ?, phone_number = ?, password_hash = ?, is_blocked = ? WHERE id = ?`,
        [customerData.full_name, customerData.phone_number, customerData.password_hash, customerData.is_blocked, id]
      );
      return result;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

  deleteCustomerById: async (id) => {
    try {
      const [result] = await db.query(
        `DELETE FROM customers WHERE id = ?`,
        [id]
      );
      return result;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },

};

module.exports = customerRepository;
