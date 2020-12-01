var express = require('express');
var router = express.Router();

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");

router.get('/', function(req, res, next) {
    res.clearCookie("jwt")
    res.sendStatus(200)
});

module.exports = router;
