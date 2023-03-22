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
    eF           DECIMAL(2, 1),
    QAInterval   INT,
    nextReview   INT,
    photoOne     TEXT,
    photoTwo     TEXT,
    photoThree   TEXT,
    PRIMARY KEY  (QAId),
    FOREIGN KEY  (userId) REFERENCES accounts(userId),
    FOREIGN KEY  (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE checkIns
(
    userId       INT NOT NULL,
    checkInDate  DATE NOT NULL,
    rememberWell TEXT,
    remember     TEXT,
    familiar     TEXT,
    forgot       TEXT,
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
    rememberWell TEXT NOT NULL,
    remember     TEXT NOT NULL,
    familiar     TEXT NOT NULL,
    forgot       TEXT NOT NULL,
    FOREIGN KEY  (userId) REFERENCES accounts(userId)
);

CREATE TABLE studyPlan
(
    userId      INT NOT NULL,
    studyPlan   DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES accounts(userId)
);



INSERT INTO accounts (username, password, avatar, email, bornDate, description, lifeMotto) VALUES
                                                                                               ('jane', 'mypassword', 'image/default1.png', 'jane@gmail.com', '2000-01-01', 'software engineer', 'Work hard, play hard'),
                                                                                               ('john', 'password123', 'image/avatar1.jpg', 'john@gmail.com',  '1998-02-14', 'teacher', 'Life is too short to be anything but happy'),
                                                                                               ('maria', 'qwerty', 'image/avatar2.jpg', 'maria@gmail.com',  '1996-05-20', 'doctor', 'Carpe diem'),
                                                                                               ('mike', 'asdf', 'image/avatar3.png', 'mike@gmail.com',  '1995-07-10', 'lawyer', 'The only way to do great work is to love what you do'),
                                                                                               ('sarah', 'zxcvbnm', 'image/avatar1.jpg', 'sarah@gmail.com', '1994-09-01', 'artist', 'Create the life you want to live');

INSERT INTO categories (userId, categoryName)
VALUES
    (1, 'Category 1');

INSERT INTO questionAnswers (userId, categoryId, QAType, question, answer, eF, QAInterval, nextReview, photoOne, photoTwo, photoThree)
VALUES
    (1, 1, 'CLICK_TYPE', 'what is the keybindings to load file in emacs?', 'C-c C-l', 2.5, 1, 0, '', '', ''),
    (1, 1, 'FILL_IN_LINE_TYPE', 'what is the keybindings to compile file in emacs?', 'C-c C-x C-c', 2.5, 1, 0, '', '', ''),
    (1, 1, 'CLICK_TYPE', 'what is the keybindings to load file in emacs?', 'C-c C-l', 2.5, 1, 0, '', '', ''),
    (1, 1, 'FILL_IN_LINE_TYPE', 'what is the keybindings to compile file in emacs?', 'C-c C-x C-c', 2.5, 1, 0, '', '', '');

INSERT INTO products (userId, title, productDescription, likeAmount, commentAmount, downloadAmount, releaseDate)
VALUES
    (1, 'Agda emacs commands', 'Agda programs are commonly edited using Emacs which is explained in this section. Other editors with interactive support for Agda include Atom (agda-mode on Atom), Visual Studio Code (agda-mode on VS Code), and Vim (agda-vim).', 6, 4, 20, "2023-2-1");

INSERT INTO productQAs (productId, QAType, question, answer, photoOne, photoTwo, photoThree)
VALUES
    (1, 'CLICK_TYPE', 'what is the keybindings to load file in emacs?', 'C-c C-l', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compile file in emacs?', 'C-c C-x C-c', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to quit in emacs?', 'C-c C-x C-q', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to kill and restart the agda process in emacs?', 'C-c C-x C-r', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to abort a command in emacs?', 'C-c C-x C-a', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to remove goals and highlighting (deactivate) in emacs?', 'C-c C-x C-d', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to toggle display of hidden arguments in emacs?', 'C-c C-x C-h', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to toggle display of irrelevant arguments in emacs?', 'C-c C-x C-i', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to show constraints in emacs?', 'C-c C-=', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to solve constraints in emacs?', 'C-c C-s', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to show all goals in emacs?', 'C-c C-?', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to move to next goal (forward) in emacs?', 'C-c C-f', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to move to previous goal (backwards) in emacs?', 'C-c C-b', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to infer (deduce) type in emacs?', 'C-c C-d', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to module contents in emacs?', 'C-c C-o', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to search definitions in scope in emacs?', 'C-c C-z', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute normal form in emacs?', 'C-c C-n', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute normal form, ignoring abstract in emacs?', 'C-u C-c C-n', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute and print normal form of show <expression> in emacs?', 'C-u C-u C-c C-n', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to comment/uncomment rest of buffer in emacs?', 'C-c C-x M-;', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to switch to a different agda version in emacs?', 'C-c C-x C-s', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to give (fill goal) in emacs?', 'C-c C-SPC', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to refine in emacs?', 'C-c C-r', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to elaborate and give (fill goal with normalized expression) in emacs?', 'C-c C-m', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to automatic proof search (auto) in emacs?', 'C-c C-a', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to case split in emacs?', 'C-c C-c', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute type of helper function and add type signature to kill ring (clipboard) in emacs?', 'C-c C-h', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to goal type in emacs?', 'C-c C-t', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to context (environment) in emacs?', 'C-c C-e', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to infer (deduce) type in emacs?', 'C-c C-d', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to goal type and context in emacs?', 'C-c C-,', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to goal type, context and inferred type in emacs?', 'C-c C-.', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to goal type, context and checked term in emacs?', 'C-c C-;', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to module contents in emacs?', 'C-c C-o', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute normal form in emacs?', 'C-c C-n', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute normal form, ignoring abstract in emacs?', 'C-u C-c C-n', '', '', ''),
    (1, 'CLICK_TYPE', 'what is the keybindings to compute and print normal form of show <expression> in emacs?', 'C-u C-u C-c C-n', '', '', '');

INSERT INTO productComments (productId, userId, content)
VALUES
    (1, 2, 'Looks good!'),
    (1, 3, 'Haha, really save my AFP'),
    (1, 3, 'Well done, bro'),
    (1, 4, 'Would be better if there are gifs showing what these commands will do');

INSERT INTO productLikes (productId, userId)
VALUES
    (1, 1),
    (1, 2);

INSERT INTO memoryRecord (userId, checkInDate, rememberWell, remember, familiar, forgot)
VALUES
    (1, '2023-02-1', 1, 2, 2, 0),
    (1, '2023-02-2', 3, 3, 6, 1),
    (1, '2023-02-3', 4, 4, 6, 5),
    (1, '2023-02-4', 5, 5, 6, 6),
    (1, '2023-02-5', 8, 6, 10, 7),
    (1, '2023-02-6', 11, 8, 11, 9),
    (1, '2023-02-7', 14, 10, 13, 9),
    (1, '2023-02-8', 16, 11, 14, 10),
    (1, '2023-02-9', 20, 13, 18, 13),
    (1, '2023-02-10', 22, 13, 18, 14),
    (1, '2023-02-11', 24, 17, 20, 14),
    (1, '2023-02-12', 25, 19, 22, 17),
    (1, '2023-02-13', 26, 19, 24, 19),
    (1, '2023-02-14', 27, 20, 27, 21),
    (1, '2023-02-15', 30, 23, 29, 24),
    (1, '2023-02-16', 34, 26, 29, 24),
    (1, '2023-02-17', 34, 27, 30, 26),
    (1, '2023-02-18', 38, 31, 31, 30),
    (1, '2023-02-19', 41, 32, 32, 34),
    (1, '2023-02-20', 45, 34, 34, 37),
    (1, '2023-02-21', 48, 36, 34, 39),
    (1, '2023-02-22', 51, 37, 36, 43),
    (1, '2023-02-23', 52, 39, 38, 44),
    (1, '2023-02-24', 53, 42, 42, 47),
    (1, '2023-02-25', 56, 43, 45, 51),
    (1, '2023-02-26', 57, 44, 48, 53),
    (1, '2023-02-27', 58, 46, 52, 56),
    (1, '2023-02-28', 60, 47, 54, 59),
    (1, '2023-03-1', 63, 53, 64, 67),
    (1, '2023-03-2', 66, 56, 65, 68),
    (1, '2023-03-3', 70, 57, 69, 68),
    (1, '2023-03-4', 70, 58, 70, 70),
    (1, '2023-03-5', 73, 59, 74, 72),
    (1, '2023-03-6', 74, 60, 77, 73),
    (1, '2023-03-7', 75, 61, 78, 73),
    (1, '2023-03-8', 76, 62, 81, 73),
    (1, '2023-03-9', 78, 64, 83, 77),
    (1, '2023-03-10', 81, 67, 87, 79),
    (1, '2023-03-11', 85, 67, 90, 83),
    (1, '2023-03-12', 87, 70, 92, 84),
    (1, '2023-02-13', 90, 73, 94, 86),
    (1, '2023-03-14', 93, 77, 94, 89),
    (1, '2023-03-15', 96, 81, 94, 93);

INSERT INTO checkInRecord(userId, continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn)
VALUES
    (1, 3, 10, 3);