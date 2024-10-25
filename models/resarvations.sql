CREATE TABLE resarvations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    table_id INT,
    time_of_resarvation TIMESTAMP NOT NULL,
    family_or_not BOOLEAN DEFAULT 0,
    details VARCHAR(256) DEFAULT 'بدون تفاصيل',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
);