CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_order_id INT, 
    internal_order_id INT,
    product_id INT NOT NULL,
    order_type ENUM('خارجي', 'داخلي'),
    total_amount DECIMAL(10, 2) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (external_order_id) REFERENCES external_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (internal_order_id) REFERENCES internal_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
