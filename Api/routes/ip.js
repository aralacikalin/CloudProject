var ip = require("ip");

var express = require('express');
var router = express.Router();
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");


router.get('/', authorize(Role.Admin) , function(req, res, next) { 
    res.json({ip:ip.address()})
});

module.exports = router;