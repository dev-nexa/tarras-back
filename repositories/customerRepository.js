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
    try {

    } catch (error) {

    }
  },

  getAllBlockedCustomers: async () => {
    try {

    } catch (error) {

    }
  },

  getAllUnblockedCustomers: async () => {
    try {

    } catch (error) {

    }
  },

  getCustomerByPhoneNumber: async (phone) => {
    try {

    } catch (error) {

    }
  },

  checkPhoneNumberExists: async (phone_number) => {
    const query = `SELECT id FROM customers WHERE phone_number = ?`;
    const [result] = await db.execute(query, [phone_number]);
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

  updateCustomerById: async (id, customerData) => {
    try {

    } catch (error) {

    }
  },

  deleteCustomerById: async (id) => {
    try {

    } catch (error) {

    }
  },

  blockCustomer: async (id) => {
    try {

    } catch (error) {

    }
  },

  unblockCustomer: async (id) => {
    try {

    } catch (error) {

    }
  }
};

module.exports = customerRepository;
