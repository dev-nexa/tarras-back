CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    order_type ENUM('External', 'Internal'),
    payment_method ENUM('Cash', 'Electronic') DEFAULT 'Cash',
    total_amount DECIMAL(10, 2) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) 
    REFERENCES external_orders(id) ON DELETE CASCADE -- Assuming this links to external_orders by default, 
    -- Modify for internal orders too if needed
);