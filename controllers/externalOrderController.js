const externalOrderRepository = require('../repositories/externalOrderRepository');
const productRepository = require('../repositories/productRepository');
const locationsRepository = require('../repositories/locationsRepository');

const externalOrderController = {
    createOrder: async (req, res) => {
        try {
            const { location_id = null, customer_id = null, customer_name_without_account = null, customer_phone_without_account = null, note = '', items } = req.body;

            // Use let to allow reassignment
            let customerId = customer_id;

            // If customer_name_without_account and customer_phone_without_account are provided, set customer_id to null
            if (!customerId && customer_name_without_account && customer_phone_without_account) {
                customerId = null;
            }

            // Check if location exists
            if (location_id) {
                const locationExists = await locationsRepository.getLocationById(location_id);
                if (!locationExists) {
                    return res.status(400).json({ message: 'الموقع غير موجود.' });
                }
            }

            let totalOrderPrice = 0;

            const orderItems = await Promise.all(items.map(async (item) => {
                const productPrice = await productRepository.getProductPriceById(item.product_id);
                if (!productPrice) {
                    throw new Error(`المنتج ذو المعرف ${item.product_id} غير موجود.`);
                }

                const totalAmount = productPrice * item.quantity;
                totalOrderPrice += totalAmount;

                return {
                    product_id: item.product_id,
                    quantity: item.quantity,
                    total_amount: totalAmount,
                    note: item.note || 'لا يوجد ملاحظات',
                    order_type: 'خارجي',
                };
            }));

            // Add delivery price if applicable
            if (location_id) {
                const deliveryPrice = await locationsRepository.getDeliveryPriceByLocationId(location_id);
                totalOrderPrice += +deliveryPrice;
            }

            // Create order
            const externalOrderId = await externalOrderRepository.createOrder({
                location_id,
                customer_id: customerId,
                customer_name_without_account,
                customer_phone_without_account,
                total_price: totalOrderPrice,
                note: note || 'لا يوجد ملاحظات',
                order_status: 'بانتظار الاتصال',
            });

            await externalOrderRepository.addOrderItems(orderItems, externalOrderId);

            res.status(201).json({
                message: 'تم إنشاء الطلب الخارجي بنجاح.',
                external_order_id: externalOrderId,
            });
        } catch (error) {
            console.error('Error creating external order:', error);
            res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الطلب الخارجي.', error: error.message });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const { state } = req.body;
            const orders = await externalOrderRepository.getOrdersByState(state);
            res.status(200).json({ message: 'تم استرجاع الطلبات بنجاح.', orders });
        } catch (error) {
            console.error('Error fetching orders by state:', error);
            res.status(500).json({ message: 'حدث خطأ أثناء استرجاع الطلبات.', error: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await externalOrderRepository.getOrderById(id);
            if (!order) {
                return res.status(404).json({ message: 'الطلب غير موجود.' });
            }

            // Fetch delivery staff details
            if (order.delivery_staff_id) {
                const staff = await externalOrderRepository.getDeliveryStaffById(order.delivery_staff_id);
                order.delivery_staff = staff;
            }

            res.status(200).json({ message: 'تم استرجاع الطلب بنجاح.', order });
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            res.status(500).json({ message: 'حدث خطأ أثناء استرجاع الطلب.', error: error.message });
        }
    },

    getOrdersByCustomerId: async (req, res) => {
        try {
            const { customerId } = req.params;
            const orders = await externalOrderRepository.getOrdersByCustomerId(customerId);
            res.status(200).json({ message: 'تم استرجاع الطلبات بنجاح.', orders });
        } catch (error) {
            console.error('Error fetching orders by customer ID:', error);
            res.status(500).json({ message: 'حدث خطأ أثناء استرجاع الطلبات.', error: error.message });
        }
    },

    // Update order state by ID
    UpdateOrderStateById: async (req, res) => {
        try {
            const { state, delivery_staff_id = null } = req.body;
            const order_id = req.params.id;

            if (!order_id || !state) {
                return res.status(400).json({ message: 'معرف الطلب والحالة الجديدة مطلوبان' });
            }

            const allowed = await externalOrderRepository.getOrderById(order_id);

            if( allowed.order_status == 'منتهية') {
                return res.status(401).json({ message: 'لا يمكن تغيير حالة طلب منتهي' });
            }

            const updatedOrder = await externalOrderRepository.updateOrderState(order_id, state, delivery_staff_id);

            if (!updatedOrder) {
                return res.status(404).json({ message: 'لم يتم ايجاد الطلب' });
            }

            res.status(200).json({ message: 'Order state updated successfully.', updatedOrder });
        } catch (error) {
            console.error('Error updating order state:', error);
            res.status(500).json({ message: 'An error occurred while updating the order state.', error: error.message });
        }
    }

};

module.exports = externalOrderController;
