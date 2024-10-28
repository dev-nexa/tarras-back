const customerRepository = require('../repositories/customerRepository');

const customerController = {

    getAllCustomers: async (req, res) => {
        try {
            const customers = await customerRepository.getAllCustomers();
            return res.status(200).json(customers);
        } catch (error) {
            return res.status(500).json({
                error: "حدث خطأ في عملية جلب البيانات",
                details: error.message
            });
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
            const { full_name, phone_number, password_hash } = req.body;

            const phoneExists = await customerRepository.checkPhoneNumberExists(phone_number);
            if (phoneExists) {
                return res.status(400).json({
                    message: "رقم الهاتف موجود بالفعل",
                });
            }

            const customerData = await customerRepository.createCustomer({
                full_name,
                phone_number,
                password_hash,
            });

            return res.status(201).json({
                message: "تم إنشاء مستخدم جديد",
                customer: customerData,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to create customer",
                details: error.message,
            });
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
