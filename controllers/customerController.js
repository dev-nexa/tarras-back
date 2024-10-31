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
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({
                    message: "يجب ادخال معرف الحساب"
                });
            }
            const customer = await customerRepository.getCustomerById(id);
            if (customer === -1) {
                return res.status(404).json({
                    message: "لا يوجد حساب يحمل هذا المعرف"
                });
            }
            return res.status(200).json(customer);
        } catch (error) {
            return res.status(500).json({
                error: "حدث خطأ في عملية جلب البيانات",
                details: error.message
            });
        }
    },

    getAllBlockedCustomers: async (req, res) => {
        try {
            const blockedCustomers = await customerRepository.getAllBlockedCustomers();
            res.json(blockedCustomers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    getAllUnblockedCustomers: async (req, res) => {
        try {
            const unblockedCustomers = await customerRepository.getAllUnblockedCustomers();
            res.json(unblockedCustomers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    getCustomerByPhoneNumber: async (req, res) => {
        try {
            const phone = req.params.phone;
            const customer = await customerRepository.getCustomerByPhoneNumber(phone);

            if (customer === -1) {
                return res.status(404).json({ message: 'لا يوجد حساب يملك هذا الرقم' });
            }

            res.json(customer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
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

    getCustomerByName: async (req, res) => {
        try {
            const { name } = req.params;
            const customers = await customerRepository.getCustomerByName(name);
            if (customers.length > 0) {
                res.json(customers);
            } else {
                res.status(404).json({ message: "لا يوجد حساب بهذا الاسم" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateCustomerById: async (req, res) => {
        try {
            const { id } = req.params;
            const customerData = req.body;

            const phoneExists = await customerRepository.checkPhoneNumberAndIdExists(customerData.phone_number, id);
            if (phoneExists) {
                return res.status(400).json({
                    message: "رقم الهاتف موجود بالفعل",
                });
            }

            const result = await customerRepository.updateCustomerById(id, customerData);

            if (result) {
                res.json({
                    message: 'تم تحديث بيانات العميل',
                    customer: result,
                });
            } else {
                res.status(404).json({ message: 'لا يوجد عميل يحمل هذا المعرف' });
            }
        } catch (error) {
            res.status(500).json({ message: "خطأ في الخادم", error });
        }
    },

    deleteCustomerById: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await customerRepository.deleteCustomerById(id);

            if (result.affectedRows > 0) {
                res.json({ message: "تم حذف العميل بنجاح." });
            } else {
                res.status(404).json({ message: "لم يتم العثور على عميل بهذا الرقم التعريفي." }); // Not found message
            }
        } catch (error) {
            res.status(500).json({ message: "خطأ في الخادم", error }); 
        }
    },

};

module.exports = customerController;
