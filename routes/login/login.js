var express = require('express');
var router = express.Router();
const pool = require('../database')

router.post('', function(req, res, next) {

    const {email, password} = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT * FROM RememberIt.accounts WHERE(email = ? AND password = ?);",
                [email, password],
                (error, results, fields) => {
                    connection.release();
                    if (error) {
                        // handle error
                        console.error(error);
                        res.send(
                            JSON.stringify({message:"fail", user:null})
                        )
                    } else {
                        console.log(results)
                        res.send(
                            JSON.stringify(results[0])
                        )
                    }
                });
        }
    });
});


module.exports = router;