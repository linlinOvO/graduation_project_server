INSERT INTO accounts (username, password, avatar, email, phone, bornDate, description, lifeMotto) VALUES
('jane', 'mypassword', 'avatar.jpg', 'jane@gmail.com', '123-456-7890', '2000-01-01', 'software engineer', 'Work hard, play hard'),
('john', 'password123', 'avatar2.jpg', 'john@gmail.com', '123-456-7891', '1998-02-14', 'teacher', 'Life is too short to be anything but happy'),
('maria', 'qwerty', 'avatar3.jpg', 'maria@gmail.com', '123-456-7892', '1996-05-20', 'doctor', 'Carpe diem'),
('mike', 'asdf', 'avatar4.jpg', 'mike@gmail.com', '123-456-7893', '1995-07-10', 'lawyer', 'The only way to do great work is to love what you do'),
('sarah', 'zxcvbnm', 'avatar5.jpg', 'sarah@gmail.com', '123-456-7894', '1994-09-01', 'artist', 'Create the life you want to live');

INSERT INTO categories (userId, categoryName)
VALUES
(1, 'Category 1'), (1, 'Category 2'), (1, 'Category 3'), (1, 'Category 4'), (1, 'Category 5'),
(2, 'Category 1'), (2, 'Category 2'), (2, 'Category 3'), (2, 'Category 4'), (2, 'Category 5');

INSERT INTO questionAnswers (userId, categoryId, QAType, question, answer, QARank)
VALUES
    (1, 1, 'CLICK_TYPE', 'question for user1_0_1', 'answer for user1_0_1', 60.25),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_2', 'answer for user1_0_2', 75.84),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_3', 'answer for user1_0_3', 42.20),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_4', 'answer for user1_0_4', 99.20),
    (1, 1, 'CLICK_TYPE', 'question for user1_0_5', 'answer for user1_0_5', 85.63),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_1', 'answer for user1_1_1', 21.33),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_2', 'answer for user1_1_2', 52.85),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_3', 'answer for user1_1_3', 25.20),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_4', 'answer for user1_1_4', 15.17),
    (1, 2, 'CLICK_TYPE', 'question for user1_1_5', 'answer for user1_1_5', 46.53),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_1', 'answer for user1_2_1', 87.14),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_2', 'answer for user1_2_2', 52.30),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_3', 'answer for user1_2_3', 56.57),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_4', 'answer for user1_2_4', 7.85),
    (1, 3, 'CLICK_TYPE', 'question for user1_2_5', 'answer for user1_2_5', 72.68),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_1', 'answer for user1_3_1', 7.18),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_2', 'answer for user1_3_2', 25.48),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_3', 'answer for user1_3_3', 57.30),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_4', 'answer for user1_3_4', 25.17),
    (1, 4, 'CLICK_TYPE', 'question for user1_3_5', 'answer for user1_3_5', 34.08),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_1', 'answer for user1_4_1', 30.00),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_2', 'answer for user1_4_2', 17.22),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_3', 'answer for user1_4_3', 54.86),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_4', 'answer for user1_4_4', 58.21),
    (1, 5, 'CLICK_TYPE', 'question for user1_4_5', 'answer for user1_4_5', 42.83),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_1', 'answer for user2_5_1', 14.00),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_2', 'answer for user2_5_2', 10.58),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_3', 'answer for user2_5_3', 16.55),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_4', 'answer for user2_5_4', 98.41),
    (2, 6, 'CLICK_TYPE', 'question for user2_5_5', 'answer for user2_5_5', 86.56),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_1', 'answer for user2_6_1', 89.42),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_2', 'answer for user2_6_2', 35.96),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_3', 'answer for user2_6_3', 44.04),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_4', 'answer for user2_6_4', 36.86),
    (2, 7, 'CLICK_TYPE', 'question for user2_6_5', 'answer for user2_6_5', 79.05),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_1', 'answer for user2_7_1', 32.84),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_2', 'answer for user2_7_2', 63.16),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_3', 'answer for user2_7_3', 28.55),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_4', 'answer for user2_7_4', 45.77),
    (2, 8, 'CLICK_TYPE', 'question for user2_7_5', 'answer for user2_7_5', 41.90),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_1', 'answer for user2_8_1', 75.82),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_2', 'answer for user2_8_2', 61.12),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_3', 'answer for user2_8_3', 62.23),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_4', 'answer for user2_8_4', 64.13),
    (2, 9, 'CLICK_TYPE', 'question for user2_8_5', 'answer for user2_8_5', 41.48),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_1', 'answer for user2_9_1', 19.21),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_2', 'answer for user2_9_2', 51.53),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_3', 'answer for user2_9_3', 8.91),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_4', 'answer for user2_9_4', 9.63),
    (2, 9, 'CLICK_TYPE', 'question for user2_9_5', 'answer for user2_9_5', 52.62);

INSERT INTO checkIns (userId, checkInDate, rememberWell, remember, familiar, forgot)
VALUES
    (1, '2023-02-01', 13, 23, 5, 0),
    (1, '2023-02-02', 2, 43, 15, 60),
    (1, '2023-01-31', 23, 14, 45, 2),
    (1, '2023-01-29', 0, 3, 0, 6);


INSERT INTO products (userId, title, productDescription, likeAmount, commentAmount, downloadAmount, releaseDate)
VALUES
    (1, 'Product 1', 'Product Description 1', 6, 4, 20, "2023-2-1"),
    (1, 'Product 2', 'Product Description 2', 20, 5, 20, "2023-2-1"),
    (1, 'Product 3', 'Product Description 3', 100, 5, 20, "2023-2-1"),
    (1, 'Product 4', 'Product Description 4', 0, 5, 20, "2023-2-1");

INSERT INTO productQAs (productId, QAType, question, answer)
VALUES
    (1, 'CLICK_TYPE', 'question for product1_1', 'answer for product1_1'),
    (1, 'CLICK_TYPE', 'question for product1_2', 'answer for product1_2'),
    (1, 'CLICK_TYPE', 'question for product1_3', 'answer for product1_3'),
    (1, 'CLICK_TYPE', 'question for product1_4', 'answer for product1_4'),
    (1, 'CLICK_TYPE', 'question for product1_5', 'answer for product1_5'),
    (2, 'CLICK_TYPE', 'question for product2_1', 'answer for product2_1'),
    (2, 'CLICK_TYPE', 'question for product2_2', 'answer for product2_2'),
    (2, 'CLICK_TYPE', 'question for product2_3', 'answer for product2_3'),
    (2, 'CLICK_TYPE', 'question for product2_4', 'answer for product2_4'),
    (2, 'CLICK_TYPE', 'question for product2_5', 'answer for product2_5');

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
