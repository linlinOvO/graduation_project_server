var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('', function(req, res) {

    const storeTemp = [{
        userId: -1,
        username: "",
        avatar: "",
        description: "",
        lifeMotto: "",
        title: "",
        productDescription: "",
        productId: -1,
        QAs: [{
            question: "",
            answer: "",
            QAId: -1,
            userId: -1,
            categoryId: -1,
            QARank: -1.00
        }],
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
            connection.query("SELECT rememberIt.store.*, rememberIt.accounts.userName, rememberIt.accounts.avatar, rememberIt.accounts.description, rememberIt.accounts.life_motto, sub_qa.QAId, sub_qa.categoryId, sub_qa.question, sub_qa.answer, sub_qa.QARank \n" +
                "FROM rememberIt.store\n" +
                "LEFT JOIN rememberIt.accounts ON rememberIt.store.userId = rememberIt.accounts.userId\n" +
                "LEFT JOIN (\n" +
                "  SELECT rememberIt.product_questions.productId, rememberIt.questionAnswers.QAId, rememberIt.questionAnswers.categoryId, rememberIt.questionAnswers.question, rememberIt.questionAnswers.answer, rememberIt.questionAnswers.QARank\n" +
                "  FROM rememberIt.product_questions\n" +
                "  JOIN rememberIt.questionAnswers ON rememberIt.product_questions.QAId = rememberIt.questionAnswers.QAId\n" +
                "  ORDER BY rememberIt.product_questions.productId, rememberIt.questionAnswers.QARank\n" +
                "  LIMIT 5\n" +
                ") AS sub_qa ON rememberIt.store.productId = sub_qa.productId;\n",
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
                            res.json(
                                {message: "success", products: transformList(results)}
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
        // console.log(item)
        // console.log(item.categoryId)
        const foundIndex = productsTemp.findIndex(tempItem => tempItem.productId === item.productId);
        // console.log(item)
        if (foundIndex === -1) {
            productsTemp.push({
                userId: item.userId,
                username: item.userName,
                avatar: item.avatar,
                description: item.description,
                lifeMotto: item.life_motto,
                title: item.title,
                productDescription: item.productDescription,
                productId: item.productId,
                QAs: [],
                likeAmount: item.likeAmount,
                commentAmount: item.commentAmount,
                downloadAmount: item.downloadAmount,
                releaseDate: formatDate(item.releaseDate)
            });
        } else {
            // console.log(item.userId)
            productsTemp[foundIndex].QAs.push({
                question: item.question,
                answer: item.answer,
                QAId: item.QAId,
                userId: item.userId,
                categoryId: item.categoryId,
                QARank: item.QARank
            });
        }
    });
    return productsTemp.sort((a, b) => a.productId - b.productId);
}

router.get('/:productId', function(req, res) {

    const { productId } = req.params
    console.log(productId)

    const productTemp = {
        productId: -1,
        userId: -1,
        title: "",
        productDescription: "",
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1,
        userName: "",
        avatar: "",
        userDescription: "",
        releaseDate: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberIt.store.*, rememberIt.accounts.userName, rememberIt.accounts.avatar, rememberIt.accounts.description\n" +
                "FROM rememberIt.store\n" +
                "JOIN rememberIt.accounts ON rememberIt.store.userId = rememberIt.accounts.userId\n" +
                "WHERE productId = ?;",
                [productId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, QA: QATemp})
                        )
                    } else {
                        if(results.length === 0){
                            res.send(
                                JSON.stringify({message: "can not find QA", QA: QATemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.send(
                                JSON.stringify({message: "success", QA: results[0]})
                            )
                        }
                    }
                });
        }
    });
});

router.get('/like/:userId', function(req, res) {

    const { userId } = req.params

    const likesTemp = [-1]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT productId FROM rememberIt.product_like WHERE userId = ?;",
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

router.get('/comment/:productId', function (req, res) {
    const {productId} = req.params

    const commentsTemp = [{
        commentId: -1,
        content: "",
        username: ""
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberIt.product_comments.commentId, rememberIt.product_comments.content, rememberIt.accounts.username\n" +
                "FROM rememberIt.product_comments\n" +
                "JOIN rememberIt.accounts\n" +
                "ON rememberIt.product_comments.userId = rememberIt.accounts.userId\n" +
                "WHERE rememberIt.product_comments.productId = ?;\n",
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

router.post('/like', function (req, res){
    const { productId, userId } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.product_like (productId, userId)VALUES (?, ?);",
                [productId, userId],
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
            connection.query("INSERT INTO rememberIt.product_comments (productId, userId, content)VALUES (?, ?, ?); SELECT commentId FROM rememberIt.product_comments WHERE productId = ? AND userId = ? AND content = ? ORDER BY commentId DESC LIMIT 1;",
                [productId, userId, content, productId, userId, content],
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
router.delete('/like/:userId/:productId', function (req, res){
    const { userId, productId } = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.product_like WHERE productId = ? and userId = ?;",
                [productId, userId],
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

router.put('', function (req, res){
    const { productId, title, productDescription } = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.questionAnswers SET title = ?, productDescription = ? WHERE productId = ?;",
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


module.exports = router;