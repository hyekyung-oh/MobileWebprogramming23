var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express & Nodemon by 2021810039 오혜경' });
});

module.exports = router;
