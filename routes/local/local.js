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

    const selectCheckInRecord = "SELECT continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn FROM rememberIt.checkInRecord where userId = ?;"

    const insertCheckInRecord = "INSERT INTO rememberIt.checkInRecord(userId, continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn) VALUES (?, 0, 0, 0);"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(selectCheckInRecord,
                [userId],
                (error, results) => {
                    // console.log(results)
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString(), checkInRecord: checkInRecordTemp})
                        )
                    } else {
                        if(results.length === 0){
                            connection.query(insertCheckInRecord,
                                [userId],
                                (error) => {
                                    if (error) {
                                        res.send(
                                            JSON.stringify({message: error.toString(), checkInRecord: checkInRecordTemp})
                                        )
                                    } else {
                                        res.send(
                                            JSON.stringify({message: "success", checkInRecord: checkInRecordTemp})
                                        )
                                    }
                                });
                        }else{
                            res.send(
                                JSON.stringify({message: "success", checkInRecord: results[0]})
                            )
                        }
                    }
                });
        }
    });
});

router.put('/todayMemoryRecord', function(req, res) {

    const { userId, checkInDate, choice, categoryId } = req.body

    // console.log(userId, checkInDate, choice, categoryId)

    let updateMemoryRecord = "UPDATE rememberIt.todayQADate SET forgot = CONCAT(forgot, ?) WHERE userId = ? AND todayQADate = ?;"
    switch (choice) {
        case "rememberWell":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET rememberWell = CONCAT(rememberWell, ?) WHERE userId = ? AND todayQADate = ?;";
            break;
        case "remember":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET remember = CONCAT(remember, ?) WHERE userId = ? AND todayQADate = ?;";
            break;
        case "familiar":
            updateMemoryRecord = "UPDATE rememberIt.todayQADate SET familiar = CONCAT(familiar, ?) WHERE userId = ? AND todayQADate = ?;";
            break;
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(updateMemoryRecord,
                [categoryId + " ", userId, checkInDate],
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
        message: "",
        rememberWell: "",
        remember: "",
        familiar: "",
        forgot: ""
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
                            JSON.stringify(todayMemoryRecordTemp)
                        )
                    } else {
                        // console.log(results)
                        const result = results[0]
                        const temp = {
                            message: "success",
                            rememberWell: result.rememberWell,
                            remember: result.remember,
                            familiar: result.familiar,
                            forgot: result.forgot
                        }
                        res.send(
                            JSON.stringify(temp)
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
        QAType: "",
        round: 0,
        photoOne: "",
        photoTwo: "",
        photoThree: "",
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT tqa.round, qa.QAId, qa.question, qa.answer, qa.QAType, qa.photoOne, qa.photoTwo, qa.photoThree FROM rememberIt.todayQuestionAnswers tqa INNER JOIN rememberIt.questionAnswers qa ON tqa.QAId = qa.QAId WHERE tqa.QAId = ?;",
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

router.put('/studyPlan', function(req, res) {

    const { userId, studyPlan } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.studyPlan SET studyPlan = ? WHERE userId = ?;",
                [studyPlan, userId],
                (error) => {
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