CREATE TABLE tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qr_code VARCHAR(255) NOT NULL UNIQUE,
    details VARCHAR(255) NOT NULL DEFAULT 'No details',
    number_of_people VARCHAR(25) NOT NULL DEFAULT 'No informations'
    table_number INT NOT NULL UNIQUE
);