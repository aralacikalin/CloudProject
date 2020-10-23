var express = require('express');
var router = express.Router();
var fs =require("fs")

/* item full name in the url is needed ex: download/myFile.txt */
router.get('/', function(req, res, next) { 
    fs.readdir("./CloudContents",(err,files)=>{
        res.send(files)

    })
});

module.exports = router;
