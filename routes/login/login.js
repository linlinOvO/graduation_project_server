var express = require('express');
var router = express.Router();
const pool = require('../database')

router.post('', function(req, res, next) {

    const {email, password} = req.body

    const userTemp = {
        userId: 0,
        userName: "",
        password: "",
        avatar: "",
        email: "",
        phone: "",
        born_date: "",
        description: "",
        life_motto: "",
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
                            res.send(
                                JSON.stringify({message: "success", user: results[0]})
                            )
                        }
                    }
                });
        }
    });
});


module.exports = router;