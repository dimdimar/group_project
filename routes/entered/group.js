const express = require('express');
const router = express.Router();
const dbconnection = require('../../lib/db')
const auth = require('../../controllers/auth')
const groupServices = require('../../services/groupServices');
const { promise } = require('../../lib/db');
const { query } = require('express-validator');

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET
});
/* GET home page. */
router.get('/:id', auth.isLoggedIn, async function(req, res, next) {
  if(!req.cookies.jwt){res.redirect("/")}
  const groupService =  new groupServices.groupServices(req.params.id);
  let followers =[]
  let user = req.user
  let posts = [];
  let group = [];
  let categories = []
  let funds = [];
  let fullUrl = req.protocol + '://' + req.get('host');
  await groupService.allTheServices(group, posts, followers, categories, funds,)
  console.log(funds)
    res.render('group', { 
      results: group[0],
      Url: fullUrl, 
      user: user, 
      posts: posts, 
      followers: followers, 
      categories:categories, 
      funds: funds });
  });
  
  
    
router.post('/donate',auth.isLoggedIn, function(req, res, next) {
  let {groupId, title , amount} = req.body
  let fullUrl = req.protocol + '://' + req.get('host');
  res.render('payment', {groupId:groupId, title: title, Url: fullUrl, amount: amount});
});

router.post('/newPost',auth.isLoggedIn, function(req, res, next) {
  let {groupId, post} = req.body
  const query = `insert into foundain_express.posts (group_id,user_id,text) values (${groupId},${req.user.user_id},'${post}');`
  dbconnection.query(query,(err,result)=>{
    if(err){console.log(err)}
    else{res.redirect(`/group/${groupId}`)};

  })
  let fullUrl = req.protocol + '://' + req.get('host');
});

// Paypal payment
router.post('/payment', auth.isLoggedIn, function(req, res, next) {
  const user = req.user
  const {
      emailAddress,
      amountDonation,
      groupId
  } = req.body

  const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": `http://localhost:1312/success/?amount=${amountDonation}&emailAddress=${user.emailAddress}&groupId=${groupId}`,
          "cancel_url": "http://localhost:1312/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": amountDonation,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amountDonation
          },
          "description": "Hat for the best team ever"
      }]
  }
  paypal.payment.create(create_payment_json, function (error, payment) {
      console.log('errorr', error)
      console.log('create_payment_json', create_payment_json)
      console.log('here-5')
      if (error) {
        console.log('here-4')
          throw error;
      } else {

          for(let i = 0;i < payment.links.length;i++){
      
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href)
            }
          }
      }
    });
})


module.exports = router;

