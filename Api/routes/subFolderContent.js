var express = require('express');
var router = express.Router();
var fs =require("fs")
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");
var path=require("path")
var {exec,execSync} =require("child_process");
const zipFolder = require('folder-zip-sync')
 


/* item full name in the url is needed ex: download/myFile.txt */
router.get('/:folder(*)', authorize(Role.Admin) ,function(req, res, next) { 

    let folder=req.params.folder

    let subFolder="./CloudContents/"+folder
    
    var fileArray =[]

    var files=fs.readdirSync(subFolder)



    files.forEach((val,i)=>{
        var size=fs.statSync(subFolder+"/"+val).size
        var ext=path.extname(subFolder+"/"+val)
        if(ext.split(".")[1]!=undefined){

            fileArray.push([val,(size/(1024*1024)),ext.split(".")[1]])
        }
        else{
            var subFiles = fs.readdirSync(subFolder+"/"+val)
            var totalSize=0
            subFiles.forEach((v,i)=>{
                totalSize+=fs.statSync(subFolder+"/"+val+"/"+v).size
            })
            fileArray.push([val,(totalSize/(1024*1024)),"folder"])

        }
    })
    res.send(fileArray)


});

module.exports = router;
