var express           = require('express');
var router            = express.Router();
var dbconnection      = require('../../lib/db')
var auth              = require('../../controllers/auth')
var DashboardServices = require('../../services/dashboardServices')
var modelGroup        = require('../../models/group')
var existingJson      = require('../../AdminNotifications/newGroup.json')
var AdminServices     = require('../../services/adminServices')

/* GET home page. */

router.get('/',auth.isLoggedIn,async function(req, res, next) {
    if(!req.cookies.jwt){res.redirect("/")}
    if(req.user.user_role !=='admin'){res.redirect("/")}
    var user = req.user
    var categories = []
    var fullUrl = req.protocol + '://' + req.get('host');
    const dashboardService = new DashboardServices.DashboardServices(user.user_id)
    await dashboardService.callTheCategories(categories)
    console.log(categories)
  
  res.render('admin', { title: 'Senior', results:"" ,user_id:req.user.user_id ,Url:fullUrl, categories:categories, groupRequests: existingJson });
});

router.post('/declined',auth.isLoggedIn, async (req,res) =>{
  var fullUrl = req.protocol + '://' + req.get('host');
  let jsonIndex = req.body.jsonIndex
  const adminServices = new AdminServices.AdminServices(null,null,jsonIndex,existingJson)
  console.log(existingJson[jsonIndex].photo , existingJson , jsonIndex)
  adminServices.deletePhoto(existingJson[jsonIndex].photo)
  adminServices.declineServices()

  res.redirect(`${fullUrl}/admin`)
  })
  router.post('/approved',auth.isLoggedIn,async (req,res) =>{
    var fullUrl = req.protocol + '://' + req.get('host');
    let jsonIndex = req.body.jsonIndex
    let newGroupAccepted = existingJson[jsonIndex]
    
    let categories = newGroupAccepted.categories
    console.log(categories)
    newGroupAccepted.status = "enabled"
    const adminServices = new AdminServices.AdminServices(newGroupAccepted,categories,jsonIndex,existingJson)
    await adminServices.acceptServices()
    res.redirect(`${fullUrl}/admin`)
    })

    router.post('/users',auth.isLoggedIn,async (req,res) =>{
      var fullUrl = req.protocol + '://' + req.get('host');
      const query = `select * from foundain_express.user where first_name =? and last_name = ?;`
      dbconnection.execute(query,[req.body.fname,req.body.lname],function (err,result) {
          if(err){return (err)
          } else{                           
            res.render('admin', { title: 'Senior', results:result ,user_id:req.user.user_id ,Url:fullUrl,  groupRequests: existingJson });
          }})
      })

      router.post('/newAdmin',auth.isLoggedIn,async (req,res) =>{
        var fullUrl = req.protocol + '://' + req.get('host');
        console.log(req.body.userId)
        const query = `update foundain_express.user set user_role = 'admin' where user_id =  ?;`
        dbconnection.execute(query,[`${req.body.userId}`],function (err,users) {
            if(err){return (err)
            } else{                           
              res.redirect(`${fullUrl}/admin`);
            }})
        })
module.exports = router;