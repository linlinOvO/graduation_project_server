var express = require('express');
var router = express.Router();
const pool = require('../database')

/* GET users listing. */
router.get('', function(req, res, next) {
  pool.getConnection((err, connection) => {
    if (err) {
      // handle error
      console.error(err);
    } else {
      connection.query('SELECT * FROM RememberIt.accounts', (error, results, fields) => {
        connection.release();
        if (error) {
          // handle error
          console.error(error);
        } else {
          res.send(results);
        }
      });
    }
  });
});

router.post('', function(req, res, next) {

  const {userName, password, avatar, email, phone, born_date, description, life_motto} = req.body

  pool.getConnection((err, connection) => {
    if (err) {
      // handle error
      console.error(err);
    } else {
      connection.query('INSERT INTO RememberIt.accounts (userName, password, avatar, email, phone, born_date, occupation, life_motto) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [userName, password, avatar, email, phone, born_date, occupation, life_motto],
          (error, results, fields) => {
        connection.release();
        if (error) {
          // handle error
          console.error(error);
        } else {
          res.send(results);
        }
      });
    }
  });
});

module.exports = router;
