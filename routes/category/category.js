var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/today/:userId', function(req, res) {

    const userId = req.params.userId
    console.log(userId)

    const categoriesTemp = [{
        categoryName: "",
        QAs: [{
            question: "",
            answer: "",
            QAType: "",
            QAId: -1,
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
            QAType: "",
            QAId: -1,
            QARank: -1.00
        }],
        categoryId: -1
    }]

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT c.*, qa.question, qa.answer, qa.QARank, qa.QAId, qa.QAType FROM rememberIt.categories c LEFT JOIN rememberIt.questionAnswers qa ON c.categoryId = qa.categoryId AND qa.userId = c.userId WHERE c.userId = ? ORDER BY categoryId, qa.QAId;",
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
            connection.query("INSERT INTO rememberIt.categories (userId, categoryName)VALUES (?, ?); SELECT categoryId FROM rememberIt.categories WHERE userId = ? AND categoryName = ?;",
                [userId, categoryName, userId, categoryName],
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

router.delete('/:categoryId', function (req, res){
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
            QAsTemp.push({
                categoryName: item.categoryName,
                QAs: item.question === null ? []: [{
                    question: item.question,
                    answer: item.answer,
                    QAType: item.QAType,
                    QAId: item.QAId,
                    QARank: item.QARank
                }],
                categoryId: item.categoryId
            });
        } else {
            // console.log(item.userId)
            QAsTemp[foundIndex].QAs.push({
                question: item.question,
                answer: item.answer,
                QAType: item.QAType,
                QAId: item.QAId,
                QARank: item.QARank
            });
        }
    });
    return QAsTemp.sort((a, b) => a.categoryId - b.categoryId);
}

module.exports = router;