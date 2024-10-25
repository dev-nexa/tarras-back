CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    content_subject VARCHAR(100) NOT NULL,
    content VARCHAR(256) NOT NULL
);