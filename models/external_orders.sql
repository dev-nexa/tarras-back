CREATE TABLE external_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    order_status ENUM('Processing', 'Confirmed', 'Delivered') DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);