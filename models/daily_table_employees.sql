CREATE TABLE daily_table_employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    table_id INT NOT NULL,
    CONSTRAINT employee_id REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT table_id REFERENCES tables(id) ON DELETE CASCADE
);