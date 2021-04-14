var express = require('express');
var router = express.Router();
const auth = require('../../controllers/auth')

/* GET home page. */
router.get('/',auth.isLoggedIn, function(req, res, next) {
  if(!req.cookies.jwt){
    res.redirect("/")}
  var fullUrl = req.protocol + '://' + req.get('host');
  res.render('chat', { title: 'Senior', Url: fullUrl });
});

module.exports = router;
