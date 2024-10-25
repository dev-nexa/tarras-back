CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    status ENUM('Available', 'Out of Stock') NOT NULL DEFAULT 'Available'
);