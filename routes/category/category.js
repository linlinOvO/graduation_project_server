var express = require('express');
var router = express.Router();
const pool = require('../database')

// router.get('/today/userId=:userId', function(req, res) {
//
//     const userId = req.params.userId
//     // console.log(userId)
//
//     const categoriesTemp = [{
//         categoryName: "",
//         QAs: [{
//             question: "",
//             answer: "",
//             QAType: "",
//             QAId: -1,
//             QARank: -1.00
//         }],
//         categoryId: -1
//     }]
//
//     pool.getConnection((err, connection) => {
//         if (err) {
//             // handle error
//             console.error(err);
//         } else {
//             connection.query("SELECT rememberIt.questionAnswers.*, rememberIt.categories.categoryName \n" +
//                 "FROM rememberIt.questionAnswers \n" +
//                 "JOIN rememberIt.categories ON rememberIt.categories.categoryId = rememberIt.questionAnswers.categoryId \n" +
//                 "WHERE rememberIt.questionAnswers.userId = ? AND QARank < 60\n" +
//                 "ORDER BY QARank \n" +
//                 "LIMIT 15;\n",
//                 [userId],
//                 (error, results) => {
//                     connection.release();
//                     if (error) {
//                         // handle error
//                         // console.error(error);
//                         // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
//                         res.send(
//                             JSON.stringify({message: error, categories: categoriesTemp})
//                         )
//                     } else {
//                         if(results.length === 0){
//                             // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
//                             res.send(
//                                 JSON.stringify({message: "No QA for today", categories: categoriesTemp})
//                             )
//                         }else{
//                             // console.log(JSON.stringify({message: "success", categories: results}))
//                             res.send(
//                                 JSON.stringify({message: "success", categories: transformList(results)})
//                             )
//                         }
//                     }
//                 });
//         }
//     });
// });


router.get('/today/userId=:userId', function(req, res) {

    const { userId } = req.params
    // console.log(userId)

    const categoriesTemp = [{
        categoryName: "",
        QAIds: [-1],
        categoryId: -1
    }]

    const today = new Date().toISOString().slice(0, 10);

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            // select the row with the specified user ID from todayQADate table
            const selectTodayQADate = `SELECT * FROM rememberIt.todayQADate WHERE userId = ?;`;
            // insert a new row with the specified user ID and formatted date
            const insertTodayQADate = `INSERT INTO rememberIt.todayQADate (userId, todayQADate, rememberWell, remember, familiar, forgot) VALUES (?, NOW(), 0, 0, 0, 0);`;
            // update a new row with the specified user ID and formatted date
            const updateTodayQADate = `UPDATE rememberIt.todayQADate SET todayQADate = NOW() WHERE userId = ?;`;
            // select specific rows from questionAnswer table
            const selectQuestionAnswers = "SELECT qA.QAId, c.categoryName, c.categoryId FROM rememberIt.questionAnswers qA JOIN rememberIt.categories c ON c.categoryId = qA.categoryId WHERE qA.userId = ? AND QARank < 60 ORDER BY QARank;";
            // select all rows from todayQuestionAnswers table
            const selectTodayQuestionAnswers = 'SELECT * FROM rememberIt.todayQuestionAnswers WHERE userId = ?;';
            // insert todayQuestionAnswers from questionAnswers
            const insertTodayQuestionAnswers = "INSERT INTO rememberIt.todayQuestionAnswers (QAId, userId, categoryName, categoryId, round) SELECT qA.QAId, ?, c.categoryName, c.categoryId, 1 FROM rememberIt.questionAnswers qA JOIN rememberIt.categories c ON c.categoryId = qA.categoryId WHERE qA.userId = ? AND QARank < 60 ORDER BY QARank LIMIT 1;"

            connection.query(selectTodayQADate, [userId], (error, results) => {
                // console.log(results)
                if (error) {
                    res.send(
                        JSON.stringify({message: error, categories: categoriesTemp})
                    )
                } else if (results.length === 0) {
                    // if no rows were found, insert a new row with the specified user ID and formatted date
                    connection.query(insertTodayQADate + selectQuestionAnswers + insertTodayQuestionAnswers,
                        [userId, userId, userId, userId], (error, results) => {
                        if (error) {
                            res.send(
                                JSON.stringify({message: error, categories: categoriesTemp})
                            )
                        } else {
                            const categoriesResults = results[1]
                            if(categoriesResults.length === 0){
                                // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                                res.send(
                                    JSON.stringify({message: "No QA for today", categories: categoriesTemp})
                                )
                            }else{
                                // console.log(JSON.stringify({message: "success", categories: results}))
                                res.send(
                                    JSON.stringify({message: "success", categories: transformList(categoriesResults)})
                                )
                            }
                        }
                    });
                } else {
                    // if a row was found, check if the todayQADate value matches the formatted date string
                    if (results[0].todayQADate.toISOString().slice(0, 10) === today) {
                        // console.log("i am here")
                        connection.query(selectTodayQuestionAnswers, [userId], (error, results) => {
                            if (error) {
                                res.send(
                                    JSON.stringify({message: error, categories: categoriesTemp})
                                )
                            } else {
                                if(results.length === 0){
                                    // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                                    res.send(
                                        JSON.stringify({message: "No QA for today", categories: categoriesTemp})
                                    )
                                }else{
                                    // console.log(JSON.stringify({message: "success", categories: results}))
                                    res.send(
                                        JSON.stringify({message: "success", categories: transformList(results)})
                                    )
                                }
                            }
                        });
                    } else {
                        connection.query(selectQuestionAnswers + updateTodayQADate + insertTodayQuestionAnswers,
                            [userId, userId, userId, userId], (error, results) => {
                            if (error) {
                                res.send(
                                    JSON.stringify({message: error, categories: categoriesTemp})
                                )
                            } else {
                                if(results.length === 0){
                                    // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                                    res.send(
                                        JSON.stringify({message: "No QA for today", categories: categoriesTemp})
                                    )
                                }else{
                                    // console.log(JSON.stringify({message: "success", categories: results}))
                                    res.send(
                                        JSON.stringify({message: "success", categories: transformList(results[0])})
                                    )
                                }
                            }
                        });
                    }
                }
            });

            // connection.query("SELECT qA.QAId, c.categoryName, c.categoryId \n" +
            //     "FROM rememberIt.questionAnswers qA\n" +
            //     "JOIN rememberIt.categories c ON c.categoryId = qA.categoryId \n" +
            //     "WHERE qA.userId = ? AND QARank < 60\n" +
            //     "ORDER BY QARank;",
            //     [userId],
            //     (error, results) => {
            //         connection.release();
            //         if (error) {
            //             // handle error
            //             // console.error(error);
            //             // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
            //             res.send(
            //                 JSON.stringify({message: error, categories: categoriesTemp})
            //             )
            //         } else {
            //             if(results.length === 0){
            //                 // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
            //                 res.send(
            //                     JSON.stringify({message: "No QA for today", categories: categoriesTemp})
            //                 )
            //             }else{
            //                 // console.log(JSON.stringify({message: "success", categories: results}))
            //                 res.send(
            //                     JSON.stringify({message: "success", categories: transformList(results)})
            //                 )
            //             }
            //         }
            //     });
        }
    });
});

router.get('/userId=:userId', function(req, res) {

    const userId = req.params.userId
    console.log(userId)

    const QAsTemp = [{
        categoryName: "",
        QAIds: [-1],
        categoryId: -1
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT c.categoryId, c.categoryName, qa.QAId FROM rememberIt.categories c LEFT JOIN rememberIt.questionAnswers qa ON c.categoryId = qa.categoryId AND qa.userId = c.userId WHERE c.userId = ? ORDER BY categoryId, qa.QAId;",
                [userId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
                        res.send(
                            JSON.stringify({message: error, categories: QAsTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "None", categories: QAsTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.send(
                                JSON.stringify({message: "success", categories: transformList(results)})
                            )
                        }
                    }
                });
        }
    });
});

router.get('/brief/userId=:userId', function(req, res) {

    const userId = req.params.userId
    // console.log(userId)

    const categoriesTemp = [{
        categoryName: "",
        categoryId: -1
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT categoryName, categoryId FROM rememberIt.categories c WHERE c.userId = ?;",
                [userId],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        // console.log(JSON.stringify({message: error, categories: QAsTemp}) )
                        res.send(
                            JSON.stringify({message: error, categories: categoriesTemp})
                        )
                    } else {
                        if(results.length === 0){
                            // console.log(JSON.stringify({message: "No QA for today", categories: QAsTemp}))
                            res.send(
                                JSON.stringify({message: "No QA", categories: categoriesTemp})
                            )
                        }else{
                            // console.log(JSON.stringify({message: "success", categories: results}))
                            res.send(
                                JSON.stringify({message: "success", categories: results})
                            )
                        }
                    }
                });
        }
    });
});

router.post('', function (req, res){
    const {userId, categoryName} = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.categories (userId, categoryName)VALUES (?, ?); SELECT categoryId FROM rememberIt.categories WHERE userId = ? ORDER BY categoryId DESC LIMIT 1;",
                [userId, categoryName, userId],
                (error, results) => {
                    // console.log(results[1][0].categoryId)
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error, newCategoryId: -1})
                        )
                    } else {
                        res.send(
                            JSON.stringify({message: "success", newCategoryId: results[1][0].categoryId})
                        )
                    }
                });
        }
    });
})

router.delete('/categoryId=:categoryId', function (req, res){
    const {categoryId} = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.questionAnswers WHERE categoryId = ?; DELETE FROM rememberIt.categories WHERE categoryId = ?;",
                [categoryId, categoryId],
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
    const {categoryId, categoryName} = req.body
    console.log(categoryId, categoryName)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.categories SET categoryName = ? WHERE categoryId = ?;",
                [categoryName, categoryId],
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

function transformList(list) {
    const QAsTemp = [];
    list.forEach(item => {
        // console.log(item)
        // console.log(item.categoryId)
        const foundIndex = QAsTemp.findIndex(tempItem => tempItem.categoryId === item.categoryId);
        // console.log(item)
        if (foundIndex === -1) {
            if(item.QAId !== null){
                QAsTemp.push({
                    categoryName: item.categoryName,
                    QAIds: [item.QAId],
                    categoryId: item.categoryId
                });
            }else{
                QAsTemp.push({
                    categoryName: item.categoryName,
                    QAIds: [],
                    categoryId: item.categoryId
                });
            }
        } else {
            // console.log(item.userId)
            QAsTemp[foundIndex].QAIds.push(item.QAId);
        }
    });
    return QAsTemp.sort((a, b) => a.categoryId - b.categoryId);
}

module.exports = router;