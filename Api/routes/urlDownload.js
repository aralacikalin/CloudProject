var express = require('express');
var router = express.Router();
var {exec} =require("child_process");


//TODO authorization is not yet added
router.post('/', function(req, res, next) { 
    var url=req.body.url
    //TODO change this to sude python for pi
    exec(`python WebScraperScripts\\LinkDownloader.py ${url}`,(e,o,ee)=>{console.log(o+e)})    
    res.sendStatus(200)

});

module.exports = router;