CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    calories INT,
    image_path VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);