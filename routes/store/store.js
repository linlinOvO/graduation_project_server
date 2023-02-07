var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('', function(req, res) {

    const storeTemp = [{
        productId: -1,
        userId: -1,
        title: "",
        productDescription: "",
        likeAmount: -1,
        commentAmount: -1,
        downloadAmount: -1,
        userName: "",
        avatar: "",
        userDescription: ""
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberIt.store.*, rememberIt.accounts.userName, rememberIt.accounts.avatar, rememberIt.accounts.description\n" +
                "FROM rememberIt.store\n" +
                "JOIN rememberIt.accounts ON rememberIt.store.userId = rememberIt.accounts.userId;\n",
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
                                JSON.stringify({message: "success", products: results})
                            )
                        }
                    }
                });
        }
    });
});

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
        userDescription: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT * FROM rememberIt.questionAnswers WHERE QAId = ?;",
                [QAId],
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

router.post('', function (req, res){
    const { userId, categoryId, question, answer, QARank } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.questionAnswers (userId, categoryId, question, answer, QARank)VALUES (?, ?, ?, ?, ?);",
                [userId, categoryId, question, answer, QARank],
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

router.delete('/:QAId', function (req, res){
    const { QAId } = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.questionAnswers WHERE QAId = ?;",
                [QAId],
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
    const { QAId, question, answer } = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.questionAnswers SET question = ?, answer = ?, QARank = 0 WHERE QAId = ?;",
                [question, answer, QAId],
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