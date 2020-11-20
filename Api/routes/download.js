var express = require('express');
var router = express.Router();
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");

/* item full name in the url is needed ex: download/myFile.txt */
router.get('/:item', authorize(Role.Admin) , function(req, res, next) { 
    let item=req.params.item;
    res.download("./CloudContents/"+item,item)
});

module.exports = router;
