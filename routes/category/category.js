var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/today/:userId', function(req, res) {

    const userId = req.params.userId
    console.log(userId)

    const QAsTemp = [{
        categoryName: "",
        QAs: [{
            question: "",
            answer: "",
            QAId: -1,
            userId: -1,
            categoryId: -1,
            QARank: -1.00
        }],
        categoryId: -1
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberIt.questionAnswers.*, rememberIt.categories.categoryName \n" +
                "FROM rememberIt.questionAnswers \n" +
                "JOIN rememberIt.categories ON rememberIt.categories.categoryId = rememberIt.questionAnswers.categoryId \n" +
                "WHERE rememberIt.questionAnswers.userId = ? AND QARank < 100\n" +
                "ORDER BY QARank \n" +
                "LIMIT 15;\n",
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
                                JSON.stringify({message: "No QA for today", categories: QAsTemp})
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

router.get('/:userId', function(req, res) {

    const userId = req.params.userId
    console.log(userId)

    const QAsTemp = [{
        categoryName: "",
        QAs: [{
            question: "",
            answer: "",
            QAId: -1,
            userId: -1,
            categoryId: -1,
            QARank: -1.00
        }],
        categoryId: -1
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT rememberIt.questionAnswers.*, rememberIt.categories.categoryName \n" +
                "FROM rememberIt.questionAnswers \n" +
                "JOIN rememberIt.categories ON rememberIt.categories.categoryId = rememberIt.questionAnswers.categoryId \n" +
                "WHERE rememberIt.questionAnswers.userId = ?;",
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
                                JSON.stringify({message: "No QA", categories: QAsTemp})
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

router.post('', function (req, res){
    const {userId, categoryName} = req.body
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.categories (userId, categoryName)VALUES (?, ?);",
                [userId, categoryName],
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

router.delete('/:categoryId', function (req, res){
    const {categoryId} = req.params
    // console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("DELETE FROM rememberIt.categories WHERE categoryId = ?;",
                [categoryId],
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
    // console.log(userId, checkInDate)

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
        const foundIndex = QAsTemp.findIndex(tempItem => tempItem.categoryId === item.categoryId);
        if (foundIndex === -1) {
            QAsTemp.push({
                categoryName: item.categoryName,
                QAs: [{
                    question: item.question,
                    answer: item.answer,
                    QAId: item.QAId,
                    userId: item.userId,
                    categoryId: item.categoryId,
                    QARank: item.QARank
                }],
                categoryId: item.categoryId
            });
        } else {
            QAsTemp[foundIndex].QAs.push({
                question: item.question,
                answer: item.answer,
                QAId: item.QAId,
                userId: item.userId,
                categoryId: item.categoryId,
                QARank: item.QARank
            });
        }
    });
    return QAsTemp.sort((a, b) => a.categoryId - b.categoryId);
}

module.exports = router;