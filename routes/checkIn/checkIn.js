var express = require('express');
var router = express.Router();
const pool = require('../database')
// const moment = require('moment');

router.get('/calendar/userId=:userId/beginDate=:beginDate/endDate=:endDate', function(req, res) {

    const {userId, beginDate, endDate} = req.params

    const calendarTemp = {
        preMonth: [],
        curMonth: [],
        nextMonth: []
    }

    function formatCheckInDate(dates) {
        let preMonth = [];
        let curMonth = [];
        let nextMonth = [];

        for (let date of dates) {
            let checkInDate = new Date(date.checkInDate);
            let month = checkInDate.getMonth() + 1;
            let day = checkInDate.getDate();
            let formattedDate = `2023-${month}-${day}`;

            switch (month) {
                case 1:
                    preMonth.push(formattedDate);
                    break;
                case 2:
                    curMonth.push(formattedDate);
                    break;
                case 3:
                    nextMonth.push(formattedDate);
                    break;
            }
        }

        return {
            preMonth,
            curMonth,
            nextMonth
        };
    }


    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT checkInDate\n" +
                "FROM rememberIt.checkIns\n" +
                "WHERE userId = ? AND checkInDate BETWEEN ? AND ?;\n",
                [userId, beginDate, endDate],
                (error, results) => {
                    //
                    //sults)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, calendar: calendarTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", calendar: formatCheckInDate(results)})
                        )
                    }
                });
        }
    });
});

router.get('/calendar/userId=:userId/checkInDate=:checkInDate', function(req, res) {

    const {userId, checkInDate} = req.params
    //
    //erId, checkInDate)

    const studyRecordTemp = {
        rememberWell: 0,
        remember: 0,
        familiar: 0,
        forgot: 0,
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberWell, remember, familiar, forgot FROM rememberIt.checkIns WHERE userId = ? AND checkInDate = ?;",
                [userId, checkInDate],
                (error, results) => {
                    //
                    //sults)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, record: studyRecordTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", record: results[0]})
                        )
                    }
                });
        }
    });
});

router.post('/calendar', function(req, res) {

    const {userId, checkInDate, rememberWell, remember, familiar, forgot} = req.body
    //
    //memberWell, remember, familiar, forgot)

    let dateObj = new Date(checkInDate)
    dateObj.setDate(dateObj.getDate() - 1)

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1; // add 1 to convert from 0-indexed to 1-indexed
    let day = dateObj.getDate();
    let formattedDate = year + '-' + month + '-' + day;
    //
    //teString)

    const checkInQuery = `INSERT INTO rememberIt.checkIns (userId, checkInDate, rememberWell, remember, familiar, forgot)VALUES (?, ?, ?, ?, ?, ?);`

    const selectCheckInRecord = `SELECT * FROM rememberIt.checkInRecord WHERE userId = ?`

    const selectCheckInQuery = 'SELECT * FROM rememberIt.checkIns WHERE userId = ? AND checkInDate = ?'

    // if(rememberWell.length > 0){
    //     const rememberWellIds = rememberWell.join(',');
    //     const rememberWellQuery = `UPDATE rememberIt.questionAnswers SET QARank = 1000 WHERE userId = ? AND QAId IN (${rememberWellIds});`;
    //     combinedQuery += rememberWellQuery
    // }
    // if(remember.length > 0){
    //     const rememberIds = remember.join(',');
    //     const rememberQuery = `UPDATE rememberIt.questionAnswers SET QARank = QARank + 50 WHERE userId = ? AND QAId IN (${rememberIds});`;
    //     combinedQuery += rememberQuery
    // }
    // if(familiar.length > 0){
    //     const familiarIds = familiar.join(',');
    //     const familiarQuery = `UPDATE rememberIt.questionAnswers SET QARank = QARank + 10 WHERE userId = ? AND QAId IN (${familiarIds});`;
    //     combinedQuery += familiarQuery
    // }
    // if(forgot.length > 0){
    //     const forgotIds = forgot.join(',');
    //     const forgotQuery = `UPDATE rememberIt.questionAnswers SET QARank = 25 WHERE userId = ? AND QAId IN (${forgotIds});`;
    //     combinedQuery += forgotQuery
    // }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(checkInQuery,
                [userId, checkInDate, rememberWell, remember, familiar, forgot],
                (error) => {
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString()})
                        )
                        return
                    }
                });

            connection.query(selectCheckInRecord,
                [userId],
                (error, result) => {
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString()})
                        )
                        return
                    }else{
                        if(result.length === 0){
                            connection.query("INSERT INTO rememberIt.checkInRecord(userId, continuallyCheckIn, totallyCheckIn, mostContinuallyCheckIn) VALUES (?, 0, 0, 0);",
                                [userId],
                                (error) => {
                                    if (error) {
                                        res.send(
                                            JSON.stringify({message: error.toString()})
                                        )
                                        return
                                    }
                                });
                        }
                    }
                });

            connection.query(selectCheckInQuery,
                [userId, formattedDate],
                (error, result) => {
                    if (error) {
                        res.send(
                            JSON.stringify({message: error.toString()})
                        )
                        return
                    } else {
                        if(result.length > 0){
                            connection.query("UPDATE rememberIt.checkInRecord SET continuallyCheckIn = continuallyCheckIn + 1, totallyCheckIn = totallyCheckIn + 1, mostContinuallyCheckIn = GREATEST(mostContinuallyCheckIn, continuallyCheckIn) WHERE userId = ?",
                                [userId],
                                (error) => {
                                    if (error) {
                                        res.send(
                                            JSON.stringify({message: error.toString()})
                                        )
                                        return
                                    } else {
                                        res.send(
                                            JSON.stringify({message: "success"})
                                        )
                                        return
                                    }
                                });
                        }else{
                            connection.query("UPDATE rememberIt.checkInRecord SET continuallyCheckIn = 0, totallyCheckIn = totallyCheckIn + 1 WHERE userId = ?",
                                [userId],
                                (error) => {
                                    if (error) {
                                        res.send(
                                            JSON.stringify({message: error.toString()})
                                        )
                                        return
                                    } else {
                                        res.send(
                                            JSON.stringify({message: "success"})
                                        )
                                        return
                                    }
                                });
                        }
                    }
                });
        }
    });
});

module.exports = router;