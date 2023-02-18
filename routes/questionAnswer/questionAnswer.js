var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/:categoryId/:userId', function(req, res) {

    const { userId, categoryId } = req.params
    console.log(userId, categoryId)

    const QAsTemp = [{
        question: "",
        answer: "",
        QAId: -1,
        userId: -1,
        categoryId: -1,
        QARank: -1.00
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT * FROM rememberIt.questionAnswers WHERE userId = ? AND categoryId = ?;",
                [userId, categoryId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
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
                            res.send(
                                JSON.stringify({message: "success", QAs: results})
                            )
                        }
                    }
                });
        }
    });
});

router.get('/:QAId', function(req, res) {

    const { QAId } = req.params
    console.log(QAId)

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        userId: -1,
        categoryId: -1,
        QARank: -1.00
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
    const { userId, categoryId, QAType, question, answer, QARank } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.questionAnswers (userId, categoryId, QAType, question, answer, QARank)VALUES (?, ?, ?, ?, ?, ?); SELECT QAId FROM rememberIt.questionAnswers WHERE userId = ? AND categoryId = ? AND question = ? AND answer = ? AND QARank = ?;",
                [userId, categoryId, QAType, question, answer, QARank, userId, categoryId, question, answer, QARank],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, newQAId: -1})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", newQAId: results[1][0].QAId})
                        )
                    }
                });
        }
    });
})

router.delete('/QAId=:QAId', function (req, res){
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
    const { QAId, question, answer, QARank } = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.questionAnswers SET question = ?, answer = ?, QARank = ? WHERE QAId = ?;",
                [question, answer, QARank, QAId],
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