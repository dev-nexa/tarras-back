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