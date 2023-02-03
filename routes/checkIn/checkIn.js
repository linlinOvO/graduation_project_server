var express = require('express');
var router = express.Router();
const pool = require('../database')

router.post('', function(req, res, next) {

    const {userId, checkInDate} = req.body
    console.log(userId, checkInDate)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("INSERT INTO rememberIt.check_ins (userId, checkInDate)VALUES (?, ?);",
                [userId, checkInDate],
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


module.exports = router;