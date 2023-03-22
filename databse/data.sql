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
    (1, 1, 'FILL_IN_LINE_TYPE', 'what is the keybindings to compile file in emacs?', 'C-c C-x C-c', 2.5, 1, 0, '', '', '');


INSERT INTO checkIns (userId, checkInDate, rememberWell, remember, familiar, forgot)
VALUES
    (1, '2023-02-1', 17, 7, 15, 12),
    (1, '2023-02-2', 8, 0, 13, 18),
    (1, '2023-02-3', 18, 18, 2, 4),
    (1, '2023-02-5', 6, 9, 16, 17),
    (1, '2023-02-6', 18, 1, 1, 5),
    (1, '2023-02-7', 6, 9, 13, 13),
    (1, '2023-02-8', 19, 1, 1, 11),
    (1, '2023-02-10', 11, 1, 4, 12),
    (1, '2023-02-11', 14, 8, 5, 15),
    (1, '2023-02-12', 15, 1, 18, 12),
    (1, '2023-02-13', 9, 2, 5, 14),
    (1, '2023-02-14', 8, 14, 18, 8),
    (1, '2023-02-15', 11, 7, 5, 9),
    (1, '2023-02-16', 2, 15, 10, 17),
    (1, '2023-02-18', 1, 13, 16, 2),
    (1, '2023-02-19', 14, 15, 9, 17),
    (1, '2023-02-22', 3, 1, 8, 18),
    (1, '2023-02-23', 8, 19, 14, 18),
    (1, '2023-02-24', 11, 11, 0, 8),
    (1, '2023-02-25', 17, 11, 13, 13),
    (1, '2023-02-26', 16, 14, 15, 5),
    (1, '2023-02-27', 1, 17, 7, 14),
    (1, '2023-02-28', 11, 16, 1, 0),
    (1, '2023-02-1', 12, 12, 10, 11),
    (1, '2023-03-2', 12, 15, 9, 7),
    (1, '2023-03-3', 17, 8, 16, 18),
    (1, '2023-03-4', 16, 4, 1, 7),
    (1, '2023-03-6', 12, 1, 8, 2),
    (1, '2023-03-8', 12, 16, 11, 4),
    (1, '2023-03-9', 3, 5, 11, 10);


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