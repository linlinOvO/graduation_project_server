DROP TABLE accounts;

CREATE TABLE accounts(
                         userId      INT PRIMARY KEY AUTO_INCREMENT,
                         userName    VARCHAR(255) NOT NULL,
                         password    VARCHAR(255) NOT NULL,
                         avatar      VARCHAR(255) NOT NULL,
                         email       VARCHAR(255) NOT NULL,
                         phone       VARCHAR(255) NOT NULL,
                         born_date   DATE         NOT NULL,
                         description VARCHAR(255) NOT NULL,
                         life_motto  VARCHAR(255) NOT NULL
);

CREATE TABLE questionAnswers
(
    QAId     INT PRIMARY KEY AUTO_INCREMENT,
    userId   INT,
    FOREIGN KEY (userId) REFERENCES accounts (userId),
    question TEXT,
    answer   TEXT,
    rank     DECIMAL(4, 2) CHECK (rank BETWEEN 0 AND 100)
);


CREATE TABLE categories
(
    categoryId   INT PRIMARY KEY AUTO_INCREMENT,
    userId       INT,
    FOREIGN KEY (userId) REFERENCES accounts (userId),
    categoryName VARCHAR(50) NOT NULL,
);


CREATE TABLE categoryQA
(
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES categories (categoryId),
    userId     INT,
    FOREIGN KEY (userId) REFERENCES accounts (userId),
    QAId       INT,
    FOREIGN KEY (QAId) REFERENCES questionAnswers (QAId),
);


    INSERT INTO accounts (userName, password, avatar, email, phone, born_date, description, life_motto) VALUES
('jane', 'mypassword', 'avatar.jpg', 'jane@gmail.com', '123-456-7890', '2000-01-01', 'software engineer', 'Work hard, play hard'),
('john', 'password123', 'avatar2.jpg', 'john@gmail.com', '123-456-7891', '1998-02-14', 'teacher', 'Life is too short to be anything but happy'),
('maria', 'qwerty', 'avatar3.jpg', 'maria@gmail.com', '123-456-7892', '1996-05-20', 'doctor', 'Carpe diem'),
('mike', 'asdf', 'avatar4.jpg', 'mike@gmail.com', '123-456-7893', '1995-07-10', 'lawyer', 'The only way to do great work is to love what you do'),
('sarah', 'zxcvbnm', 'avatar5.jpg', 'sarah@gmail.com', '123-456-7894', '1994-09-01', 'artist', 'Create the life you want to live');
