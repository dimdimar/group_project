var express = require("express");
const passport = require("passport");
var router = express.Router();
const bcrypt = require("bcryptjs");
var dbconnection = require("../../lib/db");
var auth = require("../../controllers/auth");
var dashboardServices = require('../../services/dashboardServices')
const multer = require('multer')
const upload = multer({dest:'usersPhoto/'})
const valid = require("express-validator");

var fullUrl;
/* GET home page. */
router.get("/", auth.isLoggedIn, async (req, res) => {
  if(!req.cookies.jwt){res.redirect("/")}


  fullUrl = req.protocol + "://" + req.get("host");
  let user = req.user
  let categories = []
  let followingGroups = [];
  let posts = [];
  const dashboardService = new dashboardServices.DashboardServices(user.user_id)
  await dashboardService.allTheServices(followingGroups, posts, categories)
  res.render("dashBoard", { title:`Welcome ${user.first_name}`, posts:posts, follows:followingGroups, Url: fullUrl, user:user, categories: categories });
});


router.get("/settings",auth.isLoggedIn, function (req, res, next) { 
  if(!req.cookies.jwt){res.redirect("/")}
  var user = req.user
  console.log(user)
  res.render("userSettings", { title: "Settings", Url: fullUrl, message: "",user:user });
});



router.post("/settings/pass", auth.isLoggedIn, (request, respond, next) => {
  if(!req.cookies.jwt){res.redirect("/")}

  var { currentPassword, pass, confPass } = request.body;
  const id = request.user.user_id;

  if (!pass || !confPass || !currentPassword) {
    respond.render("userSettings", {
      title: "Settings",
      Url: fullUrl,
      message: "Oops! Something went wrong! Please try again",
    });
  } else if (pass !== confPass) {
    respond.render("userSettings", {
      title: "Settings",
      Url: fullUrl,
      message: "please put the same password in both fields",
    });
  } else if (!bcrypt.compareSync(currentPassword, request.user.password)) {
    respond.render("userSettings", {
      title: "Settings",
      Url: fullUrl,
      message: "Oops! Something went wrong! Please try again",
    });
  } else {
    const password = bcrypt.hashSync(pass, 8);
    const query = "update `user` set `password` =? where (`user_id` = ?);";
    dbconnection.execute(query, [password,id], function (err, results) {
      if (err) {
        console.log(err);
      } else {
        respond.render("userSettings", {
          title: "Settings",
          message: "Password changed successfully",
          Url: fullUrl,
        });
      }
    });
  }


  router.post("/settings/Location", auth.isLoggedIn, (request, respond, next) => {
    if(!req.cookies.jwt){res.redirect("/")}
    const id = request.user.user_id;
    const location = request.body.country
    const query = "update `user` set `country` =? where (`user_id` = ?);";
    dbconnection.execute(query, [location,id], function (err, results) {
      if (err) {
        console.log(err);
      } else {
        respond.render("userSettings", {
          title: "Settings",
          message: "location changed Successfully",
          Url: fullUrl,
        });
      }
    });
  })
  
});


router.post('/settings/photo',upload.single('photoEntry'),auth.isLoggedIn, function(req, res, next) {
  if(!req.cookies.jwt){res.redirect("/")}
  var nGR = []
  const query = `update user set profile_pic = "${req.file.filename}" where (user_id = ${req.user.user_id}); `
  dbconnection.query(query,(err,result)=>{
    if (err)console.log(err)
    else  res.redirect('/dashboard/settings')
  })
  })

  router.post("/settings/Telephone",auth.isLoggedIn,(request,respond,next)=>{
    if(!request.cookies.jwt){respond.redirect("/")}
    var { currentTelephone, newTelephone } = request.body;
    const user = request.user
    // const telephone = request.body.telephone


    if (!newTelephone || !currentTelephone) {
      respond.render("userSettings", {
        title: "Settings",
        Url: fullUrl,
        message: "Oops! Something went wrong! Please try again",
      });
    } else if (currentTelephone == request.user.phone_number){
    let newNumber= newTelephone;
    const query= "update `user` set phone_number =? where (`user_id` = ?);";
    dbconnection.query(query,[newNumber,user.user_id], function(err,results){
      if (err) {
        console.log(err)
      }else{
        respond.render("userSettings", {
          title:"Settings",
          message:"Telephone changed Successfully",
          Url:fullUrl,
          user:user
        });
      }
    })}
  })

module.exports = router;
