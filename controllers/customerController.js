const customerRepository = require('../repositories/customerRepository');

const customerController = {

    getAllCustomers: async (req, res) => {
        try {
            const customers = await customerRepository.getAllCustomers();
            return res.status(200).json(customers);
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Failed to retrieve customers", details: error.message });
        }
    },

    getCustomerById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    getAllBlockedCustomers: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    getAllUnblockedCustomers: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    getCustomerByPhoneNumber: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    createCustomer: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    updateCustomerById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    deleteCustomerById: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    blockCustomer: async (req, res) => {
        try {

        } catch (error) {

        }
    },

    unblockCustomer: async (req, res) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = customerController;
