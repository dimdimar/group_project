var express           = require('express');
var router            = express.Router();
var dbconnection      = require('../../lib/db')
var auth              = require('../../controllers/auth')
var DashboardServices = require('../../services/dashboardServices')
 /* GET home page. */

       

    router.get('/',auth.isLoggedIn, async function(req,res,next) {
        if(!req.cookies.jwt){res.redirect("/")}
        console.log(req.user)
        const user = req.user
        let categories = []
        let userFollows = []
        const dashboardService = new DashboardServices.DashboardServices(req.user.user_id)
        await dashboardService.callTheCategories(categories)

        var fullUrl = req.protocol + '://' + req.get('host');
        let query = 'SELECT * FROM foundain_express.groups where group_id in (select group_id from follow where user_id = ?)';
        dbconnection.execute(query, [user.user_id],function(err, results, fields){
            if(err) {
                console.log(err)
            } else {
                console.log("here ",results)
                res.render('search', { 
                title              : '',
                titleResults       : results,
                descriptionResults : "",
                user_id            : user.user_id ,
                Url                : fullUrl,
                followCheck        : userFollows,
                
                categories         : categories,
                renderFromFollow   : true })
            }
        })

    })
    



module.exports = router;