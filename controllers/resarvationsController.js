const resarvationsRepository = require('../repositories/resarvationsRepository');
const tableRepository = require('../repositories/tableRepository');
const customerRepository = require('../repositories/customerRepository');

const productController = {

    getAllResarvations: async (req, res) => {
        try {
            const reservations = await resarvationsRepository.getAllResarvations();
            res.status(200).json({
                message: 'تم استرجاع الحجوزات بنجاح',
                data: reservations,
            });
        } catch (error) {
            console.error('Error fetching reservations:', error);
            res.status(500).json({
                message: 'خطأ في الخادم أثناء استرجاع الحجوزات.',
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    createResarvation: async (req, res) => {
        try {
            // TODO : When JWT
            const { customer_id, table_id, time_of_resarvation, family_or_not, details } = req.body;

            const isTable = await tableRepository.getTableById(table_id);
            if (isTable == null) {
                return res.status(404).json({ message: 'لا يوجد طاولة تحمل هذا الرقم.' });
            }

            const isCustomer = await customerRepository.getCustomerById(customer_id);
            if (isCustomer == -1) {
                return res.status(404).json({ message: 'لا يوجد عميل يحمل هذا الرقم.' });
            }

            const resarvationData = {
                customer_id,
                table_id, 
                time_of_resarvation,
                family_or_not: family_or_not || 0,
                details: details || 'بدون تفاصيل',
            };

            const result = await resarvationsRepository.createResarvation(resarvationData);

            if (result.insertId) {
                res.status(201).json({ message: 'تم إنشاء الحجز بنجاح.', reservation_id: result.insertId });
            } else {
                res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحجز.' });
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
            res.status(500).json({ message: 'خطأ في الخادم أثناء إنشاء الحجز.' });
        }
    },

    updateProductById: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },        

    deleteProductById: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }

};

module.exports = productController;
