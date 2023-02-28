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

router.get('/qAId=:qAId', function(req, res) {

    const { qAId } = req.params
    // console.log(qAId)

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT question, answer, QAId, QAType, QARank FROM rememberIt.questionAnswers WHERE QAId = ?;",
                [qAId],
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

router.get('/categoryId=:categoryId', function(req, res) {

    const { categoryId } = req.params
    // console.log(categoryId)

    const QAsTemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT question, answer, QAId, QAType, QARank FROM rememberIt.questionAnswers WHERE categoryId = ?;",
                [categoryId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, QAs: QAsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            res.send(
                                JSON.stringify({message: "can not find QA", QAs: QAsTemp})
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

router.post('', function (req, res){
    const { userId, categoryId, QAType, question, answer, QARank } = req.body

    const insertQA = "INSERT INTO rememberIt.questionAnswers (userId, categoryId, QAType, question, answer, QARank)VALUES (?, ?, ?, ?, ?, ?);"

    const selectQAId = "SELECT QAId FROM rememberIt.questionAnswers WHERE userId = ? AND categoryId = ? ORDER BY QAId DESC LIMIT 1;"

    const insertLocal = "INSERT INTO rememberIt.todayQuestionAnswers (QAId, userId, categoryName, categoryId, round) SELECT QAId, qa.userId, categoryName, qa.categoryId, 1 FROM rememberIt.questionAnswers qa, rememberIt.categories WHERE qa.userId = ? AND qa.categoryId = ? AND c.categoryId = qa.categoryId ORDER BY QAId DESC LIMIT 1;"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(insertQA + selectQAId + insertLocal,
                [userId, categoryId, QAType, question, answer, 32, userId, categoryId, userId, categoryId],
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

// router.delete('/today/QAId=:QAId/choice=:choice', function (req, res){
//     const { QAId, choice } = req.params
//     // console.log(userId, checkInDate)
//
//     const deleteTodayQA = "DELETE FROM rememberIt.todayQuestionAnswers WHERE QAId = ?;"
//
//     // let updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 0 WHERE QAId = ?";
//     // switch (choice) {
//     //     case "rememberWell":
//     //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 200 WHERE QAId = ?";
//     //         break;
//     //     case "remember":
//     //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = QARank + 70 WHERE QAId = ?";
//     //         break;
//     //     case "familiar":
//     //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 32 WHERE QAId = ?";
//     //         break;
//     // }
//
//     pool.getConnection((err, connection) => {
//         if (err) {
//             // handle error
//             console.error(err);
//         } else {
//             connection.query(deleteTodayQA,
//                 [QAId],
//                 (error) => {
//                     // console.log(results)
//                     connection.release();
//                     if (error) {
//                         res.send(
//                             JSON.stringify({message: error})
//                         )
//                     } else {
//                         res.send(
//                             JSON.stringify({message: "success"})
//                         )
//                     }
//                 });
//         }
//     });
// })

router.delete('/today/QAId=:QAId', function (req, res){
    const { QAId } = req.params
    // console.log(userId, checkInDate)

    const deleteTodayQA = "DELETE FROM rememberIt.todayQuestionAnswers WHERE QAId = ?;"

    // let updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 0 WHERE QAId = ?";
    // switch (choice) {
    //     case "rememberWell":
    //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 200 WHERE QAId = ?";
    //         break;
    //     case "remember":
    //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = QARank + 70 WHERE QAId = ?";
    //         break;
    //     case "familiar":
    //         updateQARank = "UPDATE rememberIt.questionAnswers SET QARank = 32 WHERE QAId = ?";
    //         break;
    // }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(deleteTodayQA,
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