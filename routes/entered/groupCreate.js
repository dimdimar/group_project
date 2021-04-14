var express = require('express');
var router = express.Router();
var dbconnection = require('../../lib/db')
var group = require('../../models/group')
const multer = require('multer')
const fs = require('fs')
var auth = require("../../controllers/auth");
var existingJson = require('../../AdminNotifications/newGroup.json')

// Multer Settings and Security about uploaded file type
const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null, 'group/')
  },
  filename: function (req,file,cb){
    cb(null, file.originalname)
  }
})
const fileFilter = (req, file,cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb(null, true);
  } else{
    cb(null,false)
  }
}
const upload = multer({
  storage: storage,
  fileFilter:fileFilter
})


/* GET home page. */
router.get('/',auth.isLoggedIn, function(req, res, next) {
  if(!req.cookies.jwt){
    res.redirect("/")}
  var fullUrl = req.protocol + '://' + req.get('host');
  const query = `select * from category` 
  dbconnection.query(query, function(err,results){
    if(err){
      console.log(err)
    }else{
      res.render('groupCreate', { title: 'Senior', Url: fullUrl, results: results })
    }
  })
});

router.post('/create',auth.isLoggedIn,upload.single('photo') , function(req, res, next) {
  var nGR = []
  console.log(req.body)
  if(req.file === undefined){
    req.file = {}
    req.file.filename = 'katt-yukawa-K0E6E0a0R3A-unsplash.jpeg'
  }
  categories = req.body.categories
  var newGroup = new group(req.body.title, req.file.filename,req.body.description,req.body.target,req.body.minDonation,req.user.user_id,categories)
  existingJson.forEach(element => {
    nGR.push(element)
  });
 
    nGR.push(newGroup)
  fs.writeFile(`AdminNotifications/newGroup.json`,JSON.stringify(nGR),(err)=>{
    if(err){console.log(err)}
  })
  res.redirect('/dashboard')
  })

module.exports = router;
