CREATE TABLE internal_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    order_status ENUM('Processing', 'Confirmed', 'Delivered') DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);