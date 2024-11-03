CREATE TABLE delivery_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    availability_state BOOLEAN DEFAULT 0,
    total_count INT NOT NULL DEFAULT 0
);