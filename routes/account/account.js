var express = require('express');
var router = express.Router();
const pool = require('../database')


router.post('/login', function(req, res, next) {

    const {email, password} = req.body

    const userTemp = {
        userId: 0,
        userName: "",
        password: "",
        avatar: "",
        email: "",
        phone: "",
        bornDate: "",
        description: "",
        lifeMotto: "",
    }

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT * FROM RememberIt.accounts WHERE(email = ? AND password = ?);",
                [email, password],
                (error, results) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
                        res.send(
                            JSON.stringify({message: error, user: userTemp})
                        )
                    } else {
                        // console.log(results)
                        if(results.length === 0){
                            res.send(
                                JSON.stringify({message: "Incorrect username or password", user: userTemp})
                            )
                        }else{
                            // console.log(results[0])
                            res.send(
                                JSON.stringify({message: "success", user: results[0]})
                            )
                        }
                    }
                });
        }
    });
});


router.post('/logUp', function(req, res, next) {

    const { username, password, email, phone, bornDate, description, lifeMotto } = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.accounts (username, password, avatar, email, phone, bornDate, description, lifeMotto)VALUES (?, ?, 'avatar', ?, ?, ?, ?, ?);",
                [username, password, email, phone, bornDate, description, lifeMotto],
                (error) => {
                    connection.release();
                    if (error) {
                        // handle error
                        // console.error(error);
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

router.put('', function (req, res){
    const { username, description, lifeMotto, userId } = req.body
    // console.log(categoryId, categoryName)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("UPDATE rememberIt.accounts SET username = ?, description = ?, life_motto = ? WHERE userId = ?;",
                [username, description, lifeMotto, userId],
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

module.exports = router;