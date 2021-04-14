var express           = require('express');
var router            = express.Router();
var dbconnection      = require('../../lib/db')
var auth              = require('../../controllers/auth')
var DashboardServices = require('../../services/dashboardServices')
var SearchBarServices = require('../../services/SearchBarServices')
var SearchObject      = require('../../models/SearchObject')
/* GET home page. */

router.get('/',auth.isLoggedIn,async function(req, res, next) {
    if(!req.cookies.jwt){res.redirect("/")}
    var user = req.user
    var categories = []
    var fullUrl = req.protocol + '://' + req.get('host');
    const dashboardService = new DashboardServices.DashboardServices(user.user_id)
    await dashboardService.callTheCategories(categories)  
  res.render('search', {
  title              : 'Senior',
  titleResults       :"",
  descriptionResults :"",
  user_id            :req.user.user_id,
  Url                :fullUrl, 
  categories         :categories, 
  renderFromFollow   :false,
  simplifier         :false });
});


router.post('/', auth.isLoggedIn, async function(req, res, next){
    if(!req.cookies.jwt){res.redirect("/")}
    const user = req.user
    const fullUrl = req.protocol + '://' + req.get('host');
    const searchObject = new SearchObject(req.body.search,req.body.categories,req.body.minDonation)
    console.log(searchObject)
    const searchBarSevice = new SearchBarServices.SearchBarServices(searchObject , user.user_id)
    let categories = []
    let searchByTitle = [];
    let searchByDescription = [];
    let userFollows = [];
    let simplifier =  await searchBarSevice.allTheServices(userFollows,searchByTitle,searchByDescription,categories)
    console.log(simplifier)
    res.render('search', {
      title              : '',
      titleResults       :searchByTitle,
      descriptionResults :searchByDescription,
      followCheck        :userFollows, 
      user_id            :user.user_id ,
      Url                :fullUrl,
      categories         :categories,
      renderFromFollow   :false,
      simplifier         :simplifier})
})                   

   



module.exports = router;