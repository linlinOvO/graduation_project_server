var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/checkInRecord/userId=:userId', function(req, res) {

    const {userId} = req.params

    const checkInRecordTemp = {
        continuallyCheckIn: 0,
        totallyCheckIn: 0,
        mostContinuallyCheckIn: 0
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn FROM rememberIt.checkInRecord where userId = ?;",
                [userId],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, checkInRecord: checkInRecordTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", checkInRecord: results[0]})
                        )
                    }
                });
        }
    });
});

router.put('/todayMemoryRecord', function(req, res) {

    const { userId, checkInDate, choice } = req.body

    let updateMemoryRecord = "UPDATE rememberIt.todayQADate SET forgot = forgot + 1 WHERE userId = ? AND todayQADate = ?;";
    switch (choice) {
        case "rememberWell":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET rememberWell = rememberWell + 1 WHERE userId = ? AND todayQADate = ?;";
            break;
        case "remember":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET remember = remember + 1 WHERE userId = ? AND todayQADate = ?;";
            break;
        case "familiar":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET familiar = familiar + 1 WHERE userId = ? AND todayQADate = ?;";
            break;
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(updateMemoryRecord,
                [userId, checkInDate],
                (error, results) => {
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
});

router.get('/todayMemoryRecord/userId=:userId/checkInDate=:checkInDate', function(req, res) {

    const { userId, checkInDate } = req.params

    const todayMemoryRecordTemp = {
        rememberWell: 0,
        remember: 0,
        familiar: 0,
        forgot: 0
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberWell, remember, familiar, forgot FROM rememberIt.todayQADate where userId = ? AND todayQADate = ?;",
                [userId, checkInDate],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString(), record: todayMemoryRecordTemp})
                        )
                    } else {
                        console.log(results)
                        res.send(
                            JSON.stringify({message: "success", record: results[0]})
                        )
                    }
                });
        }
    });
});

router.get('/round/qAId=:qAId', function(req, res) {

    const { qAId } = req.params
    // console.log(qAId)

    const QATemp = {
        question: "",
        answer: "",
        QAId: -1,
        QARank: -1.00,
        QAType: "",
        round: 0
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT tqa.round, qa.QAId, qa.question, qa.answer, qa.QAType, qa.QARank FROM rememberIt.todayQuestionAnswers tqa INNER JOIN rememberIt.questionAnswers qa ON tqa.QAId = qa.QAId WHERE tqa.QAId = ?;",
                [qAId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString(), QA: QATemp})
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

router.put('/round/qAId=:qAId', function(req, res) {

    const { qAId } = req.params

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.todayQuestionAnswers SET round = round + 1 WHERE qAId = ?;",
                [qAId],
                (error, results) => {
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
});

module.exports = router;