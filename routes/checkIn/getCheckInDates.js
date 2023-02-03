var express = require('express');
var router = express.Router();
const pool = require('../database')

router.post('', function(req, res, next) {

    const {userId, beginDate, endDate} = req.body
    // console.log(userId, beginDate, endDate)

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
                "FROM rememberIt.check_ins\n" +
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