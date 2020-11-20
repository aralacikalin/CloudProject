var express = require('express');
var router = express.Router();
var fs =require("fs")
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");

/* item full name in the url is needed ex: download/myFile.txt */
router.get('/', authorize(Role.Admin) ,function(req, res, next) { 
    fs.readdir("./CloudContents",(err,files)=>{
        res.send(files)

    })
});

module.exports = router;
