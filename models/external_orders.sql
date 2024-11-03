CREATE TABLE external_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    region_id INT NOT NULL,
    region_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    order_status ENUM('بانتظار الاتصال', 'جاري التحضير', 'جاري التوصيل', 'تم الاستلام') DEFAULT 'بانتظار الاتصال',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(256) DEFAULT 'لا يوجد ملاحظات',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (region_id) REFERENCES locations(id) ON DELETE CASCADE
);