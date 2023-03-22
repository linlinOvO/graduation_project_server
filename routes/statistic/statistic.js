var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/studyRecord/userId=:userId/categoryId=:categoryId', function(req, res) {

    const {userId, categoryId} = req.params


    const statisticDateTemp = {
        data: [[0]]
    }

    function formatStudyRecordDate(dates) {
        let rememberWellArray = [];
        let rememberArray = [];
        let familiarArray = [];
        let forgotArray = [];

        dates.forEach(function(item) {
            if(item.rememberWell === "-1"){
                rememberWellArray.push(0)
            }else{
                const myList = item.rememberWell.split(" ")
                // console.log(myList)

                if(categoryId !== "-1"){
                    // console.log("!= -1")
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    rememberWellArray.push(count)
                }else{
                    // console.log(myList.length - 1)
                    rememberWellArray.push(myList.length - 1)
                }
            }

            if(item.remember === "-1"){
                rememberArray.push(0)
            }else{
                const myList = item.remember.split(" ")
                // console.log(myList)

                if(categoryId !== "-1"){
                    // console.log("!= -1")
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    rememberArray.push(count)
                }else{
                    // console.log(myList.length - 1)
                    rememberArray.push(myList.length - 1)
                }
            }

            if(item.familiar === "-1"){
                familiarArray.push(0)
            }else{
                const myList = item.familiar.split(" ")
                // console.log(myList)


                if(categoryId !== "-1"){
                    // console.log("!= -1")
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    familiarArray.push(count)
                }else{
                    // console.log(myList.length - 1)
                    familiarArray.push(myList.length - 1)
                }
            }

            if(item.forgot === "-1"){
                forgotArray.push(0)
            }else{
                const myList = item.forgot.split(" ")

                if(categoryId !== "-1"){
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    forgotArray.push(count)
                }else{
                    // console.log(myList.length - 1)
                    forgotArray.push(myList.length - 1)
                }
            }
        });

        return [rememberWellArray, rememberArray, familiarArray, forgotArray];

    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            // console.log(33333)
            connection.query("\n" +
                "\n" +
                "SELECT date_range.date, COALESCE(t.rememberWell, -1) AS rememberWell, COALESCE(t.remember, -1) AS remember, COALESCE(t.familiar, -1) AS familiar, COALESCE(t.forgot, -1) AS forgot\n" +
                "FROM (\n" +
                "  SELECT DATE_SUB(CURDATE(), INTERVAL n DAY) AS date\n" +
                "  FROM (\n" +
                "    SELECT @row := @row + 1 AS n\n" +
                "FROM (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t1\n" +
                "CROSS JOIN (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t2\n" +
                "CROSS JOIN (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t3\n" +
                "CROSS JOIN (SELECT @row := -1) r\n" +
                "WHERE @row < 45\n" +
                "  ) AS numbers\n" +
                ") AS date_range\n" +
                "LEFT JOIN rememberIt.checkIns t\n" +
                "ON date_range.date = t.checkInDate AND userId = ?\n" +
                "ORDER BY date_range.date ASC;\n",
                [userId],
                (error, results) => {
                    // console.log(results)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, data: statisticDateTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", data: formatStudyRecordDate(results)})
                        )
                    }
                });
        }
    });
});


router.get('/memoryRecord/userId=:userId/categoryId=:categoryId', function(req, res) {

    const {userId, categoryId} = req.params
    // console.log(11111)

    const statisticDateTemp = {
        data: [[0]]
    }

    function formatMemoryRecordDate1(dates) {
        let rememberWellArray = [];
        let rememberArray = [];
        let familiarArray = [];
        let forgotArray = [];

        dates.forEach(function(item) {
            rememberWellArray.push(item.rememberWell);
            rememberArray.push(item.remember);
            familiarArray.push(item.familiar);
            forgotArray.push(item.forgot);
        });

        return [rememberWellArray, rememberArray, familiarArray, forgotArray];
    }


    function formatMemoryRecordDate(dates) {
        let rememberWellArray = [];
        let rememberArray = [];
        let familiarArray = [];
        let forgotArray = [];

        dates.forEach(function(item) {
            if(item.rememberWell === "-1"){
                rememberWellArray.push(0)
            }else{
                const myList = item.rememberWell.split(" ")

                if(categoryId !== -1){
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    rememberWellArray.push(count)
                }else{
                    rememberWellArray.push(myList.length)
                }
            }

            if(item.remember === "-1"){
                rememberArray.push(0)
            }else{
                const myList = item.remember.split(" ")

                if(categoryId !== -1){
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    rememberArray.push(count)
                }else{
                    rememberArray.push(myList.length)
                }
            }

            if(item.familiar === "-1"){
                familiarArray.push(0)
            }else{
                const myList = item.familiar.split(" ")

                if(categoryId !== -1){
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    familiarArray.push(count)
                }else{
                    familiarArray.push(myList.length)
                }
            }

            if(item.forgot === "-1"){
                forgotArray.push(0)
            }else{
                const myList = item.forgot.split(" ")

                if(categoryId !== -1){
                    let count = 0;
                    for(let i = 0; i < myList.length; i++){
                        if(myList[i] === categoryId + ""){
                            count++;
                        }
                    }
                    forgotArray.push(count)
                }else{
                    forgotArray.push(myList.length)
                }
            }
        });

        return [rememberWellArray, rememberArray, familiarArray, forgotArray];

    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            // console.log(33333)
            connection.query("SELECT date_range.date, COALESCE(t.rememberWell, 0) AS rememberWell, COALESCE(t.remember, 0) AS remember, COALESCE(t.familiar, 0) AS familiar, COALESCE(t.forgot, 0) AS forgot\n" +
                "FROM (\n" +
                "  SELECT DATE_SUB(CURDATE(), INTERVAL n DAY) AS date\n" +
                "  FROM (\n" +
                "    SELECT @row := @row + 1 AS n\n" +
                "FROM (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t1\n" +
                "CROSS JOIN (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t2\n" +
                "CROSS JOIN (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t3\n" +
                "CROSS JOIN (SELECT @row := -1) r\n" +
                "WHERE @row < 45\n" +
                "  ) AS numbers\n" +
                ") AS date_range\n" +
                "LEFT JOIN rememberIt.memoryRecord t\n" +
                "ON date_range.date = t.checkInDate AND userId = ?\n" +
                "ORDER BY date_range.date ASC;",
                [userId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, data: statisticDateTemp})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", data: formatMemoryRecordDate(results)})
                        )
                    }
                });
        }
    });
});

module.exports = router;