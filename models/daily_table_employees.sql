CREATE TABLE daily_table_employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    table_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
);