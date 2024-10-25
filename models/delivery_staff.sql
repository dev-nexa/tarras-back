CREATE TABLE delivery_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    availability_status ENUM('Available', 'Busy') DEFAULT 'Available',
    total_count INT NOT NULL DEFAULT 0,
);