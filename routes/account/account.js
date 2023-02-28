var express = require('express');
var router = express.Router();
const pool = require('../database')
const nodemailer = require('nodemailer');


router.post('/login', function(req, res, next) {

    const {email, password} = req.body

    const userTemp = {
        userId: 0,
        username: "",
        password: "",
        avatar: "",
        email: "",
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

    const { username, password, email, bornDate, description, lifeMotto } = req.body

    const insertAccount = "INSERT INTO rememberIt.accounts (username, password, avatar, email, bornDate, description, lifeMotto)VALUES (?, ?, 'avatar', ?, ?, ?, ?);"

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(insertAccount,
                [username, password, email, bornDate, description, lifeMotto],
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
    const { username, description, lifeMotto, userId, password, avatar, email, bornDate } = req.body
    // console.log(categoryId, categoryName)

    let SqlSentence = "UPDATE rememberIt.accounts SET "
    let parts = []
    const params = []

    if(username !== ""){
        parts.push("username = ?")
        params.push(username)
    }
    if(description !== ""){
        parts.push("description = ?")
        params.push(description)
    }
    if(lifeMotto !== ""){
        parts.push("lifeMotto = ?")
        params.push(lifeMotto)
    }
    if(avatar !== ""){
        parts.push("avatar = ?")
        params.push(avatar)
    }
    if(email !== ""){
        parts.push("email = ?")
        params.push(email)
    }
    if(bornDate !== ""){
        parts.push("bornDate = ?")
        params.push(bornDate)
    }
    if(password !== ""){
        parts.push("password = ?")
        params.push(password)
    }

    SqlSentence += parts.join(", ") + " WHERE userId = ?;"
    params.push(userId)
    console.log(SqlSentence)
    console.log(params)

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query(SqlSentence,
                params,
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

router.get('/verify/email=:email', function (req, res) {
    const { email } = req.params;

    // pool.getConnection((err, connection) => {
    //     if (err) {
    //         // handle error
    //         console.error(err);
    //     } else {
    //         connection.query("SELECT * FROM rememberIt.accounts WHERE email = ?",
    //             [email],
    //             (error, result) => {
    //                 // console.log(results)
    //                 connection.release();
    //                 if (error) {
    //                     res.send(
    //                         JSON.stringify({message: error})
    //                     )
    //                 }
    //                 if(result.length > 0){
    //                     res.send(
    //                         JSON.stringify({message: "The email has already been used"})
    //                     )
    //                 }
    //             });
    //     }
    // });

    const code = Math.floor(100000 + Math.random() * 900000); // generate 6-digit code
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shenzelin0918@gmail.com',
            pass: 'bphijcbdarsfkezx'
        }
    });

    const mailOptions = {
        from: 'shenzelin0918@gmail.com',
        to: email,
        subject: 'Verify Your Remember It Account',
        text: `Dear User,

Thank you for choosing Remember It! To complete your registration, please use the following verification code:

Verification Code: ${code}

To enter the code, simply go to the verification screen on the Remember It app and enter it in the appropriate field.

If you did not request a verification code, please ignore this email.

Best regards,

The Remember It Team`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send(JSON.stringify({message: 'Error sending verification code.'}));
        } else {
            console.log('Verification code sent: ' + info.response);
            res.status(200).send(JSON.stringify({message: `success ${code}`}));
        }
    });
});


router.get('/check/email=:email', function (req, res) {
    const { email } = req.params;

    pool.getConnection((err, connection) => {
        if (err) {
            // handle error
            console.error(err);
        } else {
            connection.query("SELECT userId FROM rememberIt.accounts WHERE email = ?",
                [email],
                (error, result) => {
                    connection.release();
                    if (error) {
                        res.send(
                            JSON.stringify({message: error})
                        )
                    }
                    if(result.length === 0){
                        res.send(
                            JSON.stringify({message: "no account"})
                        )
                    }else{
                        res.send(
                            JSON.stringify({message: `exist ${result[0].userId}`})
                        )
                    }
                });
        }
    });
});

module.exports = router;