DROP TABLE todayQuestionAnswers;
DROP TABLE todayQADate;
DROP TABLE studyPlan;
DROP TABLE questionAnswers;
DROP TABLE categories;
DROP TABLE checkIns;
DROP TABLE memoryRecord;
DROP TABLE checkInRecord;
DROP TABLE productQAs;
DROP TABLE productComments;
DROP TABLE productLikes;
DROP TABLE products;
DROP TABLE accounts;

CREATE TABLE accounts
(
    userId      INT AUTO_INCREMENT,
    username    VARCHAR(50) NOT NULL,
    password    VARCHAR(50) NOT NULL,
    avatar      VARCHAR(255) NOT NULL,
    email       VARCHAR(225) NOT NULL,
    bornDate    DATE         NOT NULL,
    description VARCHAR(255) NOT NULL,
    lifeMotto   VARCHAR(255) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE categories
(
    categoryId   INT AUTO_INCREMENT,
    userId       INT,
    categoryName VARCHAR(50) NOT NULL,
    PRIMARY KEY  (categoryId),
    FOREIGN KEY  (userId) REFERENCES accounts(userId)
);

CREATE TABLE questionAnswers
(
    QAId         INT AUTO_INCREMENT,
    userId       INT,
    categoryId   INT,
    QAType       VARCHAR(20),
    question     TEXT,
    answer       TEXT,
    QARank       DECIMAL(7, 3),
    photoOne       TEXT,
    photoTwo       TEXT,
    photoThree       TEXT,
    PRIMARY KEY  (QAId),
    FOREIGN KEY  (userId) REFERENCES accounts(userId),
    FOREIGN KEY  (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE checkIns
(
    userId       INT NOT NULL,
    checkInDate  DATE NOT NULL,
    rememberWell INT,
    remember     INT,
    familiar     INT,
    forgot       INT,
    FOREIGN KEY  (userId) REFERENCES accounts(userId)
);

CREATE TABLE products
(
    productId          INT AUTO_INCREMENT,
    userId             INT NOT NULL,
    title              VARCHAR(50) NOT NULL,
    productDescription VARCHAR(255) NOT NULL,
    likeAmount         INT NOT NULL,
    commentAmount      INT NOT NULL,
    downloadAmount     INT NOT NULL,
    releaseDate        DATE NOT NULL,
    PRIMARY KEY        (productId),
    FOREIGN KEY        (userId) REFERENCES accounts(userId)
);

CREATE TABLE productQAs
(
    productQAId        INT AUTO_INCREMENT,
    productId   INT,
    QAType      VARCHAR(20),
    question    TEXT,
    answer      TEXT,
    photoOne       TEXT,
    photoTwo       TEXT,
    photoThree       TEXT,
    PRIMARY KEY (productQAId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

CREATE TABLE productComments
(
    commentId   INT AUTO_INCREMENT,
    productId   INT NOT NULL,
    userId      INT NOT NULL,
    content     TEXT,
    PRIMARY KEY (commentId),
    FOREIGN KEY (userId) REFERENCES accounts(userId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

CREATE TABLE productLikes
(
    productId   INT NOT NULL,
    userId      INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES accounts(userId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

CREATE TABLE memoryRecord
(
    userId       INT NOT NULL,
    checkInDate  DATE NOT NULL,
    rememberWell INT,
    remember     INT,
    familiar     INT,
    forgot       INT,
    FOREIGN KEY  (userId) REFERENCES accounts(userId)
);

CREATE TABLE checkInRecord
(
    userId                 INT NOT NULL,
    continuallyCheckIn     INT NOT NULL,
    totallyCheckIn         INT NOT NULL,
    mostContinuallyCheckIn INT NOT NULL,
    FOREIGN KEY            (userId) REFERENCES accounts(userId)
);

CREATE TABLE todayQuestionAnswers
(
    QAId         INT,
    userId       INT,
    categoryName VARCHAR(50) NOT NULL,
    categoryId   INT,
    round        INT,
    FOREIGN KEY  (QAId) REFERENCES questionAnswers(QAId),
    FOREIGN KEY  (userId) REFERENCES accounts(userId),
    FOREIGN KEY  (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE todayQADate
(
    userId       INT NOT NULL,
    todayQADate  DATE NOT NULL,
    rememberWell INT NOT NULL,
    remember INT NOT NULL,
    familiar INT NOT NULL,
    forgot INT NOT NULL,
    FOREIGN KEY  (userId) REFERENCES accounts(userId)
);

CREATE TABLE studyPlan
(
    userId      INT NOT NULL,
    studyPlan   DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES accounts(userId)
);

INSERT INTO accounts (username, password, avatar, email, bornDate, description, lifeMotto) VALUES
                                                                                               ('jane', 'mypassword', 'avatar.jpg', 'jane@gmail.com', '2000-01-01', 'software engineer', 'Work hard, play hard'),
                                                                                               ('john', 'password123', 'avatar2.jpg', 'john@gmail.com',  '1998-02-14', 'teacher', 'Life is too short to be anything but happy'),
                                                                                               ('maria', 'qwerty', 'avatar3.jpg', 'maria@gmail.com',  '1996-05-20', 'doctor', 'Carpe diem'),
                                                                                               ('mike', 'asdf', 'avatar4.jpg', 'mike@gmail.com',  '1995-07-10', 'lawyer', 'The only way to do great work is to love what you do'),
                                                                                               ('sarah', 'zxcvbnm', 'avatar5.jpg', 'sarah@gmail.com', '1994-09-01', 'artist', 'Create the life you want to live');

INSERT INTO categories (userId, categoryName)
VALUES
    (1, 'Category 1'), (1, 'Category 2'), (1, 'Category 3'), (1, 'Category 4'), (1, 'Category 5'),
    (2, 'Category 1'), (2, 'Category 2'), (2, 'Category 3'), (2, 'Category 4'), (2, 'Category 5');

INSERT INTO questionAnswers (userId, categoryId, QAType, question, answer, QARank, photoOne, photoTwo, photoThree)
VALUES
    (1, 1, 'CLICK_TYPE', 'question for user1_0_1', 'answer for user1_0_1', 60.25, 'image/default.png', '', 'image/test.png'),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_2', 'answer for user1_0_2', 75.84, '', '', ''),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_3', 'answer for user1_0_3', 42.20, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_4', 'answer for user1_0_4', 99.20, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_5', 'answer for user1_0_5', 85.63, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_1', 'answer for user1_1_1', 21.33, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_2', 'answer for user1_1_2', 52.85, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_3', 'answer for user1_1_3', 25.20, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_4', 'answer for user1_1_4', 15.17, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_5', 'answer for user1_1_5', 46.53, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_1', 'answer for user1_2_1', 87.14, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_2', 'answer for user1_2_2', 52.30, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_3', 'answer for user1_2_3', 56.57, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 3, 'FILL_IN_LINE_TYPE', 'question for user1_2_4', 'answer for user1_2_4', 7.85, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_5', 'answer for user1_2_5', 72.68, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 4, 'FILL_IN_LINE_TYPE', 'question for user1_3_1', 'answer for user1_3_1', 7.18, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_2', 'answer for user1_3_2', 25.48, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_3', 'answer for user1_3_3', 57.30, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_4', 'answer for user1_3_4', 25.17, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_5', 'answer for user1_3_5', 34.08, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_1', 'answer for user1_4_1', 30.00, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_2', 'answer for user1_4_2', 17.22, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_3', 'answer for user1_4_3', 54.86, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_4', 'answer for user1_4_4', 58.21, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_5', 'answer for user1_4_5', 42.83, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_1', 'answer for user2_5_1', 14.00, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_2', 'answer for user2_5_2', 10.58, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_3', 'answer for user2_5_3', 16.55, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_4', 'answer for user2_5_4', 98.41, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_5', 'answer for user2_5_5', 86.56, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_1', 'answer for user2_6_1', 89.42, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_2', 'answer for user2_6_2', 35.96, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_3', 'answer for user2_6_3', 44.04, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_4', 'answer for user2_6_4', 36.86, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_5', 'answer for user2_6_5', 79.05, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_1', 'answer for user2_7_1', 32.84, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_2', 'answer for user2_7_2', 63.16, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_3', 'answer for user2_7_3', 28.55, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_4', 'answer for user2_7_4', 45.77, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_5', 'answer for user2_7_5', 41.90, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_1', 'answer for user2_8_1', 75.82, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_2', 'answer for user2_8_2', 61.12, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_3', 'answer for user2_8_3', 62.23, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_4', 'answer for user2_8_4', 64.13, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_5', 'answer for user2_8_5', 41.48, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_1', 'answer for user2_9_1', 19.21, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_2', 'answer for user2_9_2', 51.53, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_3', 'answer for user2_9_3', 8.91, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_4', 'answer for user2_9_4', 9.63, 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_5', 'answer for user2_9_5', 52.62, 'image/default.png', 'image/default1.png', 'image/test.png');

INSERT INTO checkIns (userId, checkInDate, rememberWell, remember, familiar, forgot)
VALUES
    (1, '2023-01-1', 17, 7, 15, 12),
    (1, '2023-01-2', 8, 0, 13, 18),
    (1, '2023-01-3', 18, 18, 2, 4),
    (1, '2023-01-5', 6, 9, 16, 17),
    (1, '2023-01-6', 18, 1, 1, 5),
    (1, '2023-01-7', 6, 9, 13, 13),
    (1, '2023-01-8', 19, 1, 1, 11),
    (1, '2023-01-10', 11, 1, 4, 12),
    (1, '2023-01-11', 14, 8, 5, 15),
    (1, '2023-01-12', 15, 1, 18, 12),
    (1, '2023-01-13', 9, 2, 5, 14),
    (1, '2023-01-14', 8, 14, 18, 8),
    (1, '2023-01-15', 11, 7, 5, 9),
    (1, '2023-01-16', 2, 15, 10, 17),
    (1, '2023-01-18', 1, 13, 16, 2),
    (1, '2023-01-19', 14, 15, 9, 17),
    (1, '2023-01-22', 3, 1, 8, 18),
    (1, '2023-01-23', 8, 19, 14, 18),
    (1, '2023-01-24', 11, 11, 0, 8),
    (1, '2023-01-25', 17, 11, 13, 13),
    (1, '2023-01-26', 16, 14, 15, 5),
    (1, '2023-01-29', 1, 17, 7, 14),
    (1, '2023-01-30', 11, 16, 1, 0),
    (1, '2023-01-31', 10, 11, 12, 18),
    (1, '2023-02-1', 12, 12, 10, 11),
    (1, '2023-02-2', 12, 15, 9, 7),
    (1, '2023-02-3', 17, 8, 16, 18),
    (1, '2023-02-4', 16, 4, 1, 7),
    (1, '2023-02-6', 12, 1, 8, 2),
    (1, '2023-02-8', 12, 16, 11, 4),
    (1, '2023-02-9', 3, 5, 11, 10);


INSERT INTO products (userId, title, productDescription, likeAmount, commentAmount, downloadAmount, releaseDate)
VALUES
    (1, 'Product 1', 'Product Description 1', 6, 4, 20, "2023-2-1"),
    (1, 'Product 2', 'Product Description 2', 20, 5, 20, "2023-2-1"),
    (1, 'Product 3', 'Product Description 3', 100, 5, 20, "2023-2-1"),
    (1, 'Product 4', 'Product Description 4', 0, 5, 20, "2023-2-1");

INSERT INTO productQAs (productId, QAType, question, answer, photoOne, photoTwo, photoThree)
VALUES
    (1, 'CLICK_TYPE', 'question for product1_1', 'answer for product1_1', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 'CLICK_TYPE', 'question for product1_2', 'answer for product1_2', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 'CLICK_TYPE', 'question for product1_3', 'answer for product1_3', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 'CLICK_TYPE', 'question for product1_4', 'answer for product1_4', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (1, 'CLICK_TYPE', 'question for product1_5', 'answer for product1_5', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 'CLICK_TYPE', 'question for product2_1', 'answer for product2_1', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 'CLICK_TYPE', 'question for product2_2', 'answer for product2_2', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 'CLICK_TYPE', 'question for product2_3', 'answer for product2_3', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 'CLICK_TYPE', 'question for product2_4', 'answer for product2_4', 'image/default.png', 'image/default1.png', 'image/test.png'),
    (2, 'CLICK_TYPE', 'question for product2_5', 'answer for product2_5', 'image/default.png', 'image/default1.png', 'image/test.png');

INSERT INTO productComments (productId, userId, content)
VALUES
    (1, 2, 'Comment 1'),
    (1, 2, 'Comment 2'),
    (2, 2, 'Comment 3'),
    (1, 2, 'Comment 4');

INSERT INTO productLikes (productId, userId)
VALUES
    (1, 1),
    (1, 2);


INSERT INTO memoryRecord (userId, checkInDate, rememberWell, remember, familiar, forgot)
VALUES
    (1, '2023-01-1', 1, 2, 2, 0),
    (1, '2023-01-2', 3, 3, 6, 1),
    (1, '2023-01-3', 4, 4, 6, 5),
    (1, '2023-01-4', 5, 5, 6, 6),
    (1, '2023-01-5', 8, 6, 10, 7),
    (1, '2023-01-6', 11, 8, 11, 9),
    (1, '2023-01-7', 14, 10, 13, 9),
    (1, '2023-01-8', 16, 11, 14, 10),
    (1, '2023-01-9', 20, 13, 18, 13),
    (1, '2023-01-10', 22, 13, 18, 14),
    (1, '2023-01-11', 24, 17, 20, 14),
    (1, '2023-01-12', 25, 19, 22, 17),
    (1, '2023-01-13', 26, 19, 24, 19),
    (1, '2023-01-14', 27, 20, 27, 21),
    (1, '2023-01-15', 30, 23, 29, 24),
    (1, '2023-01-16', 34, 26, 29, 24),
    (1, '2023-01-17', 34, 27, 30, 26),
    (1, '2023-01-18', 38, 31, 31, 30),
    (1, '2023-01-19', 41, 32, 32, 34),
    (1, '2023-01-20', 45, 34, 34, 37),
    (1, '2023-01-21', 48, 36, 34, 39),
    (1, '2023-01-22', 51, 37, 36, 43),
    (1, '2023-01-23', 52, 39, 38, 44),
    (1, '2023-01-24', 53, 42, 42, 47),
    (1, '2023-01-25', 56, 43, 45, 51),
    (1, '2023-01-26', 57, 44, 48, 53),
    (1, '2023-01-27', 58, 46, 52, 56),
    (1, '2023-01-28', 60, 47, 54, 59),
    (1, '2023-01-29', 60, 48, 57, 61),
    (1, '2023-01-30', 61, 49, 61, 62),
    (1, '2023-01-31', 62, 50, 63, 64),
    (1, '2023-02-1', 63, 53, 64, 67),
    (1, '2023-02-2', 66, 56, 65, 68),
    (1, '2023-02-3', 70, 57, 69, 68),
    (1, '2023-02-4', 70, 58, 70, 70),
    (1, '2023-02-5', 73, 59, 74, 72),
    (1, '2023-02-6', 74, 60, 77, 73),
    (1, '2023-02-7', 75, 61, 78, 73),
    (1, '2023-02-8', 76, 62, 81, 73),
    (1, '2023-02-9', 78, 64, 83, 77),
    (1, '2023-02-10', 81, 67, 87, 79),
    (1, '2023-02-11', 85, 67, 90, 83),
    (1, '2023-02-12', 87, 70, 92, 84),
    (1, '2023-02-13', 90, 73, 94, 86),
    (1, '2023-02-14', 93, 77, 94, 89),
    (1, '2023-02-15', 96, 81, 94, 93);

INSERT INTO checkInRecord(userId, continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn)
VALUES
    (1, 3, 10, 3);