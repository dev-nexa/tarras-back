CREATE TABLE external_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NULL,
    delivery_staff_id INT NULL,
    customer_id INT NULL,
    customer_name_without_account VARCHAR(50) NULL,
    customer_phone_without_account VARCHAR(50) NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_status  VARCHAR(50) DEFAULT 'بانتظار الاتصال',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(256) DEFAULT 'لا يوجد ملاحظات',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);