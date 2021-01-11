var express = require('express');
var router = express.Router();
var {exec,execSync} =require("child_process");
var fs =require("fs");
const { setInterval } = require('timers');

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");


router.post('/',authorize(Role.Admin), async function(req, res, next) { 
    var url=req.body.url
    //TODO change this to sude python for pi
    var output =execSync(`python -u WebScraperScripts\\LinkLister.py ${url}`).toString()


    if(output.includes("OK")){
        var links=output.split(",")
        links.pop()
        res.send(links)
    }
    else{
        res.sendStatus(408)
    }



});

module.exports = router;