CREATE TABLE tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qr_code VARCHAR(255) NOT NULL UNIQUE,
    details VARCHAR(255) NOT NULL DEFAULT 'بدون تفاصيل',
    number_of_people INT NOT NULL DEFAULT 2و
    table_number INT NOT NULL UNIQUE
);