const pool = require('../config/db');

const customerRepository = {
    
    getAllCustomers: async () => {
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM customers");
      connection.release();
      return rows;
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

    createCustomer: async (customerData) => {
        try {

      } catch (error) {

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
