const db = require('../config/db');

const externalOrderRepository = {
    createOrder: async (orderData) => {
        const query = `
            INSERT INTO external_orders (location_id, customer_id, customer_name_without_account, customer_phone_without_account, total_price, note, order_status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            orderData.location_id,
            orderData.customer_id || null,  // Ensure it's null if undefined
            orderData.customer_name_without_account || null,  // Null if not provided
            orderData.customer_phone_without_account || null,  // Null if not provided
            orderData.total_price,
            orderData.note,
            orderData.order_status,
        ]);
        return result.insertId;
    },

    addOrderItems: async (items, externalOrderId) => {
        const query = `
            INSERT INTO order_items (external_order_id, product_id, quantity, total_amount, note, order_type)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const promises = items.map((item) =>
            db.execute(query, [
                externalOrderId,
                item.product_id,
                item.quantity,
                item.total_amount,
                item.note,
                item.order_type,
            ])
        );
        await Promise.all(promises);
    },

    getOrdersByState: async (state) => {
        let query;
        if (state == 'كل الطلبات') {
            query = `
                SELECT eo.*,
                   c.full_name AS customer_name,
                   l.region AS location_name
                FROM external_orders eo
                LEFT JOIN customers c ON eo.customer_id = c.id
                LEFT JOIN locations l ON eo.location_id = l.id
            `;
        } else {
            query = `
                SELECT eo.*,
                   c.full_name AS customer_name,
                   l.region AS location_name
                FROM external_orders eo
                LEFT JOIN customers c ON eo.customer_id = c.id
                LEFT JOIN locations l ON eo.location_id = l.id
                WHERE eo.order_status = ?
            `;
        }
        const [orders] = await db.execute(query, [state]);

        for (const order of orders) {
            order.items = await externalOrderRepository.getOrderItemsByOrderId(order.id);
        }
        return orders;
    },

    getOrderById: async (id) => {
        const query = `
            SELECT eo.*,
                   c.full_name AS customer_name,
                   l.region AS location_name
            FROM external_orders eo
            LEFT JOIN customers c ON eo.customer_id = c.id
            LEFT JOIN locations l ON eo.location_id = l.id
            WHERE eo.id = ?
        `;
        const [orders] = await db.execute(query, [id]);
        if (orders.length === 0) return null;

        const order = orders[0];
        order.items = await externalOrderRepository.getOrderItemsByOrderId(order.id);
        return order;
    },

    getOrdersByCustomerId: async (customerId) => {
        const query = `
            SELECT eo.*,
                   c.full_name AS customer_name,
                   l.region AS location_name
            FROM external_orders eo
            LEFT JOIN customers c ON eo.customer_id = c.id
            LEFT JOIN locations l ON eo.location_id = l.id
            WHERE eo.customer_id = ?
        `;
        const [orders] = await db.execute(query, [customerId]);

        for (const order of orders) {
            order.items = await externalOrderRepository.getOrderItemsByOrderId(order.id);
        }
        return orders;
    },

    getOrderItemsByOrderId: async (orderId) => {
        const query = `
            SELECT oi.product_id, p.product_name, oi.quantity, oi.total_amount, oi.note
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.external_order_id = ?
        `;
        const [items] = await db.execute(query, [orderId]);
        return items;
    },

    getDeliveryStaffById: async (deliveryStaffId) => {
        const query = `SELECT full_name, phone_number FROM delivery_staff WHERE id = ?`;
        const [staff] = await db.execute(query, [deliveryStaffId]);
        return staff[0]; // Return the first staff record
    },

    // Update order state in the database
    updateOrderState: async (order_id, new_state, delivery_staff_id) => {
        let result;
        if (new_state == 'يتم التوصيل') {
            const query = `
                UPDATE external_orders
                SET order_status = ?, delivery_staff_id = ?
                WHERE id = ?;
            `;

            [result] = await db.execute(query, [new_state, delivery_staff_id, order_id]);
        } else {
            const query = `
                UPDATE external_orders
                SET order_status = ?
                WHERE id = ?;
            `;

            [result] = await db.execute(query, [new_state, order_id]);
        }
        

        if (result.affectedRows === 0) {
            return null; // Order not found
        }

        // Return updated order details after the update
        const updatedOrderQuery = `
            SELECT id, total_price, order_status, note
            FROM external_orders
            WHERE id = ?
        `;
        const [updatedOrder] = await db.execute(updatedOrderQuery, [order_id]);

        return updatedOrder[0]; // Return the updated order details
    }

};

module.exports = externalOrderRepository;
