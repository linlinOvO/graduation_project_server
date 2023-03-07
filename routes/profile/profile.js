var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('', function(req, res) {

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
                    // console.log(results)
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

router.get('/checkInDate/:userId/:checkInDate', function(req, res) {

    const {userId, checkInDate} = req.params
    console.log(userId, checkInDate)

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
                    // console.log(results)
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

router.post('', function(req, res) {

    const {userId, checkInDate, rememberWell, remember, familiar, forgot} = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.checkIns (userId, checkInDate, rememberWell, remember, familiar, forgot)VALUES (?, ?, ?, ?, ?, ?);",
                [userId, checkInDate, rememberWell, remember, familiar, forgot],
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
});

router.get('/memoryRecord/:userId', function(req, res) {

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
                    // console.log(results)
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



module.exports = router;