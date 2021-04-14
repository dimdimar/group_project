var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');

  res.render('index', { Url:fullUrl });
});

module.exports = router;
