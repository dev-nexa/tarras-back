CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price DECIMAL(10, 2) NOT NULL,
    type VARCHAR(100) NOT NULL,
    calories INT,
    image_path VARCHAR(255) NOT NULL,
    status ENUM('متوفر', 'غير متوفر') NOT NULL DEFAULT 'متوفر'
);