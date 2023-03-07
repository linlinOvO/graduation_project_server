var express = require('express');
var router = express.Router();
const pool = require('../database')
const fs = require("fs");
//
// router.get('/:categoryId/:userId', function(req, res) {
//
//     const { userId, categoryId } = req.params
//     console.log(userId, categoryId)
//
//     const QAsTemp = [{
//         question: "",
//         answer: "",
//         QAId: -1,
//         userId: -1,
//         QARank: -1.00,
//         photoOne: "",
//         photoTwo: "",
//         photoThree: ""
//     }]
//
//     pool.getConnection((err, connection) => {
//         if (err) {
//             // handle error
//             console.error(err);
//         } else {
//             connection.query("SELECT * FROM rememberIt.questionAnswers WHERE userId = ? AND categoryId = ?;",
//                 [userId, categoryId],
//                 (error, results) => {
//                     connection.release();
//                     if (error) {
//                         // handle error
//                         // console.error(error);
//                         // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
//                         res.send(
//                             JSON.stringify({message: error, QAs: QAsTemp})
//                         )
//                     } else {
//                         if(results.length === 0){
//                             // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
//                             res.send(
//                                 JSON.stringify({message: "No QAs", QAs: QAsTemp})
//                             )
//                         }else{
//                             // console.log(JSON.stringify({message: "success", categories: results}))
//                             res.send(
//                                 JSON.stringify({message: "success", QAs: results})
//                             )
//                         }
//                     }
//                 });
//         }
//     });
// });

router.get('/qAId=:qAId', function(req, res) {

    const { qAId } = req.params
    // console.log(qAId)

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT question, answer, QAId, QAType, QARank, photoOne, photoTwo, photoThree FROM rememberIt.questionAnswers WHERE QAId = ?;",
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

    const QAsTemp = [{
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
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
            connection.query("SELECT question, answer, QAId, QAType, QARank, photoOne, photoTwo, photoThree FROM rememberIt.questionAnswers WHERE categoryId = ?;",
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
                                JSON.stringify({message: "none", QAs: QAsTemp})
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

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }

    const { userId, categoryId, QAType, question, answer, photoOne, photoTwo, photoThree } = req.body

    const insertQA = "INSERT INTO rememberIt.questionAnswers (userId, categoryId, QAType, question, answer, QARank, photoOne, photoTwo, photoThree)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"

    const selectQA = "SELECT question, answer, QAId, QAType, QARank, photoOne, photoTwo, photoThree FROM rememberIt.questionAnswers WHERE userId = ? AND categoryId = ? ORDER BY QAId DESC LIMIT 1;"

    const insertLocal = "INSERT INTO rememberIt.todayQuestionAnswers (QAId, userId, categoryName, categoryId, round) SELECT QAId, qa.userId, categoryName, qa.categoryId, 1 FROM rememberIt.questionAnswers qa, rememberIt.categories c WHERE qa.userId = ? AND qa.categoryId = ? AND c.categoryId = qa.categoryId ORDER BY QAId DESC LIMIT 1;"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(insertQA + selectQA + insertLocal,
                [userId, categoryId, QAType, question, answer, 32, photoOne, photoTwo, photoThree, userId, categoryId, userId, categoryId],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, newQA: QATemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", newQA: results[1][0]})
                        )
                    }
                });
        }
    });
})

router.delete('/QAId=:QAId', function (req, res){
    const { QAId } = req.params
    // console.log(userId, checkInDate)

    const deleteQuestionAnswer = "DELETE FROM rememberIt.questionAnswers WHERE QAId = ?;"
    const deleteTodayQuestionAnswer = "DELETE FROM rememberIt.todayQuestionAnswers WHERE QAId = ?;"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(deleteTodayQuestionAnswer + deleteQuestionAnswer,
                [QAId, QAId],
                (error) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString()})
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

router.delete('/today/QAId=:QAId', function (req, res){
    const { QAId } = req.params
    // console.log(userId, checkInDate)

    const deleteTodayQA = "DELETE FROM rememberIt.todayQuestionAnswers WHERE QAId = ?;"

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

    const { QAId, question, answer, QARank, photoOne, photoTwo, photoThree } = req.body
    // console.log(userId, checkInDate)


    let SqlSentence = "UPDATE rememberIt.questionAnswers SET "
    let parts = []
    const params = []

    if(question !== ""){
        parts.push("question = ?")
        params.push(question)
    }
    if(answer !== ""){
        parts.push("answer = ?")
        params.push(answer)
    }
    if(QARank !== ""){
        parts.push("QARank = ?")
        params.push(QARank)
    }
    if(photoOne !== ""){
        parts.push("photoOne = ?")
        params.push(photoOne)
    }
    if(photoTwo !== ""){
        parts.push("photoTwo = ?")
        params.push(photoTwo)
    }
    if(photoThree !== ""){
        parts.push("photoThree = ?")
        params.push(photoThree)
    }

    SqlSentence += parts.join(", ") + " WHERE QAId = ?;"
    params.push(QAId)

    const selectQA = "SELECT question, answer, QAId, QAType, QARank, photoOne, photoTwo, photoThree FROM rememberIt.questionAnswers WHERE QAId = ?"

    params.push(QAId)

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(SqlSentence + selectQA,
                params,
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, newQA: QATemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", newQA: results[1][0]})
                        )
                    }
                });
        }
    });
})

router.get('/test/categoryId=:categoryId', function(req, res) {

    const { categoryId } = req.params

    const maxQAs = 50

    const QAsTemp = [{
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }]

    const selectRandomLinesQuery = "SELECT * FROM rememberIt.questionAnswers WHERE categoryId = ? ORDER BY RAND() LIMIT ?;"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(selectRandomLinesQuery,
                [categoryId, maxQAs],
                (error, results) => {
                    connection.release()
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, QAs: QAsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            res.send(
                                JSON.stringify({message: "none", QAs: QAsTemp})
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

router.get('/test/userId=:userId', function(req, res) {

    const { userId } = req.params

    const maxQAs = 50

    const QAsTemp = [{
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        photoOne: "",
        photoTwo: "",
        photoThree: ""
    }]

    const selectRandomLinesQuery = "SELECT * FROM rememberIt.questionAnswers WHERE userId = ? ORDER BY RAND() LIMIT ?;"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(selectRandomLinesQuery,
                [userId, maxQAs],
                (error, results) => {
                    connection.release()
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, QAs: QAsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            res.send(
                                JSON.stringify({message: "none", QAs: QAsTemp})
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


module.exports = router;