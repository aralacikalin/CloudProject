var express = require('express');
var router = express.Router();

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");

/* GET users listing. */
router.get('/', authorize(), function(req, res, next) {
  res.sendStatus(200)
});

module.exports = router;
