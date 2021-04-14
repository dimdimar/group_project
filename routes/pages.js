var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')

/* GET home page. */
router.get('/',authController.isLoggedIn, (req, res) => {
    if(req.cookies.jwt){
        res.redirect("/dashboard")
    }else{
        var fullUrl = req.protocol + '://' + req.get('host');
        res.render('index', { Url:fullUrl });
    }
});
    





// Enter to login page
router.get('/login', (req, res) => {
    if(req.cookies.jwt){
        res.redirect("/dashboard")
    }else{
    res.render('login', {message: ''});
    }
});
// authentication in login
router.post('/login', authController.login)

// Enter to signup page
router.get('/signup',(req, res) => {
    if(req.cookies.jwt){
        res.redirect("/dashboard")
    }else{
      res.render('signup', {message: ''});
    }
});

  // authentication in signUp
  router.post('/signup', authController.register)





module.exports = router;
