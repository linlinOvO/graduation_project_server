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