CREATE TABLE internal_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_state BOOLEAN NOT NULL DEFAULT 0,
    note VARCHAR(256) DEFAULT 'لا يوجد ملاحظات',
    rate INT DEFAULT 0,
    open_close BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
);

1. put (change-table-state/:table_id/:1)
2. post new internal_orders with {
    table_id,
    total_price: 0,
    order_state: 0, // الميزان
    open_close: 1,
}
3. post new order_items with {
    internal_order_id from 2,
    product_id // مياه ,
    order_type: داخلي,
    quantity,
    total_amount: // سعر المياه ,
}
4. 