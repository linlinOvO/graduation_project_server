var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/product', function(req, res) {

    const storeTemp = [{
        userId: -1,
        username: "",
        avatar: "",
        description: "",
        lifeMotto: "",
        title: "",
        productDescription: "",
        productId: -1,
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1,
        releaseDate: "0-0-0"
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT \n" +
                "    p.*, \n" +
                "    a.username, \n" +
                "    a.avatar, \n" +
                "    a.description, \n" +
                "    a.lifeMotto\n" +
                "FROM rememberIt.products p\n" +
                "INNER JOIN rememberIt.accounts a ON p.userId = a.userId;",
                [],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
                        res.send(
                            JSON.stringify({message: error, products: storeTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No product", products: storeTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.send(
                                JSON.stringify({message: "success", products: transformList(results)})
                            )
                        }
                    }
                });
        }
    });
});
router.get('/search/searchText=:searchText', function(req, res) {

    const {searchText} = req.params

    const storeTemp = [{
        userId: -1,
        username: "",
        avatar: "",
        description: "",
        lifeMotto: "",
        title: "",
        productDescription: "",
        productId: -1,
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1,
        releaseDate: "0-0-0"
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
            res.send(
                JSON.stringify({message: err, products: storeTemp})
            )
        } else {
            connection.query("SELECT \n" +
                "    p.*, \n" +
                "    a.username, \n" +
                "    a.avatar, \n" +
                "    a.description, \n" +
                "    a.lifeMotto\n" +
                "FROM rememberIt.products p\n" +
                "INNER JOIN rememberIt.accounts a ON p.userId = a.userId\n" +
                "WHERE p.title LIKE ?;",
                [searchText + "%"],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
                        res.send(
                            JSON.stringify({message: error.message, products: storeTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No product", products: storeTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.send(
                                JSON.stringify({message: "success", products: results})
                            )
                        }
                    }
                });
        }
    });
});

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

function transformList(list) {
    const productsTemp = [];
    list.forEach(item => {
        productsTemp.push({
            userId: item.userId,
            username: item.username,
            avatar: item.avatar,
            description: item.description,
            lifeMotto: item.lifeMotto,
            title: item.title,
            productDescription: item.productDescription,
            productId: item.productId,
            likeAmount: item.likeAmount,
            commentAmount: item.commentAmount,
            downloadAmount: item.downloadAmount,
            releaseDate: formatDate(item.releaseDate)
        })
    });
    return productsTemp.sort((a, b) => a.productId - b.productId);
}


router.get('/like/userId=:userId', function(req, res) {

    const { userId } = req.params

    const likesTemp = [-1]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT productId FROM rememberIt.productLikes WHERE userId = ?;",
                [userId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, likes: likesTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No product", likes: likesTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.json(
                                {message: "success", likes: formatLikes(results)}
                            )
                        }
                    }
                });
        }
    });
});

function formatLikes(likes){
    const tempList = []
    for (let i in likes){
        const like = likes[i]
        tempList.push(like.productId)
    }
    return tempList
}

router.get('/comment/productId=:productId', function (req, res) {
    const {productId} = req.params

    const commentsTemp = [{
        commentId: -1,
        content: "",
        username: "",
        avatar: ""
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT c.commentId, c.content, a.username, a.avatar\n" +
                "FROM rememberIt.productComments c\n" +
                "JOIN rememberIt.accounts a\n" +
                "ON c.userId = a.userId\n" +
                "WHERE c.productId = ?;",
                [productId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, comments: commentsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No product", comments: commentsTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.json(
                                {message: "success", comments: results}
                            )
                        }
                    }
                });
        }
    });
})

router.get('/QA/productId=:productId', function (req, res) {
    const {productId} = req.params

    const QAsTemp = [{
        question: "",
        answer: "",
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT question, answer, QAType, photoOne, photoTwo, photoThree FROM rememberIt.productQAs WHERE productId = ?;",
                [productId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, QAs: QAsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No QAs", QAs: QAsTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.json(
                                {message: "success", QAs: results}
                            )
                        }
                    }
                });
        }
    });
})

router.post('/like', function (req, res){
    const { productId, userId } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.productLikes (productId, userId)VALUES (?, ?); UPDATE rememberIt.products SET likeAmount = likeAmount + 1 WHERE productId = ?;",
                [productId, userId, productId],
                (error) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success"})
                        )
                    }
                });
        }
    });
})

router.post('/comment', function (req, res){
    const { productId, userId, content } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.productComments (productId, userId, content)VALUES (?, ?, ?); " +
                "SELECT commentId FROM rememberIt.productComments WHERE productId = ? AND userId = ? AND content = ? ORDER BY commentId DESC LIMIT 1; " +
                "UPDATE rememberIt.products SET commentAmount = commentAmount + 1 WHERE productId = ?;",
                [productId, userId, content, productId, userId, content, productId],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, newCommentId: -1})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", newCommentId: results[1][0].commentId})
                        )
                    }
                });
        }
    });
})

router.delete('/like/userId=:userId/productId=:productId', function (req, res){
    const { userId, productId } = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.productLikes WHERE productId = ? and userId = ?; UPDATE rememberIt.products SET likeAmount = likeAmount - 1 WHERE productId = ?;",
                [productId, userId, productId],
                (error) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success"})
                        )
                    }
                });
        }
    });
})

router.post('/product/download', function (req, res){
    const {userId, categoryName, productId} = req.body
    // console.log(userId, checkInDate)

    const QAsTemp = [{
        categoryName: "",
        QAIds: [-1],
        categoryId: -1
    }]


    function transformList(list) {
        const QAsTemp = [];
        list.forEach(item => {
            // console.log(item)
            // console.log(item.categoryId)
            const foundIndex = QAsTemp.findIndex(tempItem => tempItem.categoryId === item.categoryId);
            // console.log(item)
            if (foundIndex === -1) {
                QAsTemp.push({
                    categoryName: item.categoryName,
                    QAIds: item.question === null ? []: [item.QAId],
                    categoryId: item.categoryId
                });
            } else {
                // console.log(item.userId)
                QAsTemp[foundIndex].QAIds.push(item.QAId);
            }
        });
        return QAsTemp.sort((a, b) => a.categoryId - b.categoryId);
    }

    const insertCategory = "INSERT INTO rememberIt.categories (userId, categoryName) VALUES (?, ?);"

    const setCategoryId = "SET @newId = LAST_INSERT_ID();"

    const insertQA = "INSERT INTO rememberIt.questionAnswers (userId, categoryId, QAType, question, answer, eF, QAInterval, nextReview, photoOne, photoTwo, photoThree) SELECT ?, @newId, QAType, question, answer, 0, -1, -1, photoOne, photoTwo, photoThree FROM rememberIt.productQAs WHERE productId = ?;"

    const selectCategory = "SELECT c.categoryId, c.categoryName, qa.QAId FROM rememberIt.categories c LEFT JOIN rememberIt.questionAnswers qa ON c.categoryId = qa.categoryId AND qa.userId = c.userId WHERE c.categoryId = @newId ORDER BY qa.QAId;"

    const insertLocal = "INSERT INTO rememberIt.todayQuestionAnswers (QAId, userId, categoryName, categoryId, round) SELECT QAId, ?, ?, @newId, 1 FROM rememberIt.questionAnswers WHERE categoryId = @newId"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            res.send(
                JSON.stringify({message: err.toString(), category: QAsTemp})
            )
        } else {
            connection.query(insertCategory + setCategoryId + insertQA + selectCategory + insertLocal,
                [userId, categoryName, userId, productId, userId, categoryName],
                (error, results) => {
                    // console.log(results[1][0].categoryId)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, category: QAsTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", category: transformList(results[3])[0]})
                        )
                    }
                });
        }
    });
})

router.put('/product', function (req, res){
    const { productId, title, productDescription } = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.products SET title = ?, productDescription = ? WHERE productId = ?;",
                [title, productDescription, productId],
                (error) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success"})
                        )
                    }
                });
        }
    });
})

router.delete('/product/productId=:productId', function (req, res){
    const { productId } = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.productQAs WHERE productId = ?;\n" +
                "DELETE FROM rememberIt.productComments WHERE productId = ?;\n" +
                "DELETE FROM rememberIt.productLikes WHERE productId = ?;\n" +
                "DELETE FROM rememberIt.products WHERE productId = ?;",
                [productId, productId, productId, productId],
                (error) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success"})
                        )
                    }
                });
        }
    });
})

// get products by userId
router.get('/userId=:userId', function (req, res) {
    const {userId} = req.params

    const productsTemp = [{
        title: "",
        productDescription: "",
        productId: -1,
        QAs: [{
            question: "",
            answer: "",
            QAType: ""
        }],
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1
    }]

    function formatResults(list){
        const productsTemp = [];
        list.forEach(item => {
            // console.log(item)
            const foundIndex = productsTemp.findIndex(tempItem => tempItem.productId === item.productId);

            if (foundIndex === -1) {
                productsTemp.push({
                    title: item.title,
                    productDescription: item.productDescription,
                    productId: item.productId,
                    QAs: item.question === null ? []: [{
                        question: item.question,
                        answer: item.answer,
                        QAType: item.QAType
                    }],
                    likeAmount: item.likeAmount,
                    commentAmount: item.commentAmount,
                    downloadAmount: item.downloadAmount,
                });
            } else {
                productsTemp[foundIndex].QAs.push({
                    question: item.question,
                    answer: item.answer,
                    QAType: item.QAType
                });
            }
        });
        return productsTemp
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT p.title, p.productDescription, p.productId, p.likeAmount, \n" +
                "p.commentAmount, p.downloadAmount,QA.question, QA.answer, QA.QAType\n" +
                "FROM rememberIt.products p\n" +
                "LEFT JOIN (\n" +
                "    SELECT productId, QAType, question, answer\n" +
                "    FROM rememberIt.productQAs\n" +
                "    ORDER BY productId, productQAId\n" +
                "    LIMIT 5\n" +
                ") QA ON p.productId = QA.productId\n" +
                "WHERE p.userId = 1;\n",
                [userId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, products: productsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No product", products: productsTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.json(
                                {message: "success", products: formatResults(results)}
                            )
                        }
                    }
            });
        }
    });
})

router.post('/product', function (req, res){
    const { userId, title, productDescription, categoryId } = req.body

    const productTemp = {
        title: "",
        productDescription: "",
        productId: -1,
        QAs: [{
            question: "",
            answer: "",
            QAType: ""
        }],
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1
    }

    function formatResults(list){
        const productsTemp = [];
        list.forEach(item => {
            // console.log(item)
            const foundIndex = productsTemp.findIndex(tempItem => tempItem.productId === item.productId);

            if (foundIndex === -1) {
                productsTemp.push({
                    title: title,
                    productDescription: productDescription,
                    productId: item.productId,
                    QAs: item.question === null ? []: [{
                        question: item.question,
                        answer: item.answer,
                        QAType: item.QAType
                    }],
                    likeAmount: 0,
                    commentAmount: 0,
                    downloadAmount: 0,
                });
            } else {
                productsTemp[foundIndex].QAs.push({
                    question: item.question,
                    answer: item.answer,
                    QAType: item.QAType
                });
            }
        });
        return productsTemp[0]
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("-- Insert a new row into the products table\n" +
                "INSERT INTO rememberIt.products (userId, title, productDescription, likeAmount, commentAmount, downloadAmount, releaseDate) VALUES (?, ?, ?, 0, 0, 0, CURDATE());\n" +
                "\n" +
                "-- Get the ID of the newly inserted row in products\n" +
                "SELECT LAST_INSERT_ID() INTO @rememberIt.product_id;\n" +
                "\n" +
                "-- Insert selected rows from questionAnswers into productQAs\n" +
                "INSERT INTO rememberIt.productQAs (productId, QAType, question, answer) SELECT @rememberIt.product_id, QAType, question, answer FROM rememberIt.questionAnswers WHERE categoryId = ?;\n" +
                "\n" +
                "-- Select the productId and selected rows from productQAs\n" +
                "SELECT productId, QAType, question, answer FROM rememberIt.productQAs WHERE productId = @rememberIt.product_id LIMIT 5;\n",
                [userId, title, productDescription, categoryId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, product: productTemp})
                        )
                    } else {
                        res.json(
                            {message: "success", product: formatResults(results[3])}
                        )
                    }
                });
        }
    });


})

module.exports = router;