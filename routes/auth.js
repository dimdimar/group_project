var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
const authController = require('../controllers/auth');


// Log out
router.get('/logout', authController.logout)

module.exports = router;