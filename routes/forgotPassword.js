var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


router.get('/', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host');

    res.render('forgot',{Url:fullUrl});
});

router.post('/',(req, res) => {

    let emailAddress = req.body.emailAddress

    dbconnection.query('SELECT user_id, emailAddress FROM user WHERE emailAddress = ?', [emailAddress], async (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results.length === 0){
            
            res.send('Invalid Email')
        }
        const token = jwt.sign({ emailAddress: emailAddress}, process.env.RESET_PASSWORD_KEY, {expiresIn: '5m'});
        const data = {
            from: 'noreply@hello.com',
            to: emailAddress,
            subject: 'Reset Password Link',
            html: `
                <h2>Click here to Reset your password</h2>
                <p>${process.env.CLIENT_URL}/forgot/reset/${token}</p>
            `
        };
        mg.messages().send(data, function (error, body) {
            if (error){
                console.log(error)
            }
        });
        dbconnection.query(`UPDATE user SET passwordResetToken = '${token}' WHERE user_id = ${results[0].user_id}`,  (err, results) => {
        
            if (err){
                console.log(err)
            } 
            else{
                res.send('Your link to reset the password has been sent.')
            }
        });
    })
    
});

router.get('/reset/:token',   (req, res) => {
    res.render('reset')
})

router.post('/reset/:token', async(req, res) => {
    let token = req.params.token
    let password = req.body.password
    let confPass = req.body.confPass
    const decoded = (jwt.verify)(token, process.env.RESET_PASSWORD_KEY)
    let hashedPassword = await bcrypt.hash(password, 8);


    if (password !== confPass){
        return res.render('login', {message: 'Passwords do not match'})
    }else{
        dbconnection.query('SELECT user_id, emailAddress FROM user WHERE emailAddress = ?', [decoded.emailAddress], async (err, results) => {
            if (err) {
                console.log(err)
            }else{
                dbconnection.query(`UPDATE user SET password = '${hashedPassword}' WHERE user_id = ${results[0].user_id}`,  (err, results) => {
                    if (err){
                        console.log('eeeer', err)
                    } 
                    else{
                        return res.redirect('/login')
                    }
                });
            }
            
        });
    }
});



// Exporting the router.
module.exports = router;