const express          = require('express');
const router           = express.Router();
const dbconnection     = require('../../lib/db')
const auth             = require('../../controllers/auth')
const callTheFollowers = require('../../services/groupServices');
const paypal = require('paypal-rest-sdk');


router.get('/', (req, res) => {
  
    const payerId      = req.query.PayerID;
    const paymentId    = req.query.paymentId;
    const donation     = req.query.amount;
    const emailAddress = req.query.emailAddress
    const groupId      = req.query.groupId
     
    dbconnection.query('SELECT * FROM user WHERE emailAddress = ?', [emailAddress], async (err, results) => {
     
        let user_id = results[0].user_id;
        const query = `INSERT INTO donation(amount, user_id, group_id) VALUES( ${donation},'${user_id}','${groupId}')`;
        dbconnection.query(query,  (err, results) => {
        if (err){
            console.log(err)
        } else{
            const execute_payment_json = {
                "payer_id": payerId,
                "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": donation
                    }
                }]
              };
              paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                
                if (error) {
                  
                    console.log(error.response);
                    throw error;
                } else {res.redirect('/dashboard');}
            });
        }
        })
    })
  
    
  });
  
  // Paypal payment
  router.get('/cancel', (req, res) => res.send('Cancelled'));

  module.exports = router;