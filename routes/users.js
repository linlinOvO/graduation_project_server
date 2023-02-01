var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
      JSON.stringify({message:"success"})
  )
});

module.exports = router;
