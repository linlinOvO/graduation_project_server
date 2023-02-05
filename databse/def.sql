CREATE TABLE accounts
(
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

CREATE TABLE categories
(
    categoryId   INT PRIMARY KEY AUTO_INCREMENT,
    userId       INT,
    categoryName VARCHAR(50) NOT NULL
);

CREATE TABLE questionAnswers
(
    QAId     INT PRIMARY KEY AUTO_INCREMENT,
    userId   INT,
    categoryId INT,
    question TEXT,
    answer   TEXT,
    QARank     DECIMAL(4, 2)
);

CREATE TABLE check_ins
(
    userId INT NOT NULL,
    checkInDate DATE NOT NULL,
    rememberWell INT,
    remember INT,
    familiar INT,
    forgot INT
);

CREATE TABLE store
(
    productId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    productDescription TEXT NOT NULL,
    likeAmount INT NOT NULL,
    commentAmount INT NOT NULL,
    downloadAmount INT NOT NULL
);

CREATE TABLE product_comments
(
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    content TEXT
);

CREATE TABLE product_questions
(
    productId INT NOT NULL,
    QAId INT NOT NULL
);

CREATE TABLE product_like
(
    productId INT NOT NULL,
    userId INT NOT NULL
);