var express = require('express');
var router = express.Router();
var fs =require("fs")
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");
var path=require("path")

/* item full name in the url is needed ex: download/myFile.txt */
router.get('/', authorize(Role.Admin) ,function(req, res, next) { 

    
    var fileArray =[]

    var files=fs.readdirSync("./CloudContents")
    files.forEach((val,i)=>{
        var size=fs.statSync("./CloudContents/"+val).size
        var ext=path.extname("./CloudContents/"+val)
        fileArray.push([val,(size/(1024*1024)),ext.split(".")[1]])
    })
    res.send(fileArray)

    /*
    fs.readdir("./CloudContents",(err,files)=>{
        files.forEach((val,i)=>{
            fs.stat("./CloudContents/"+val,(e,stats)=>{
                var fileStat= [val,(stats.size/ (1024*1024))]
                fileArray.push(fileStat)
            })
        })
        
        res.send(fileArray)
    })*/
});

module.exports = router;
