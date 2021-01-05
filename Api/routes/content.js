var express = require('express');
var router = express.Router();
var fs =require("fs")
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");
var path=require("path")
 

const getSizeFolderRecursive =function(path) {
    var files = [];
    var size=0;
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                size+=getSizeFolderRecursive(curPath);
            } else { // delete file
                size+=fs.lstatSync(curPath).size
            }
        });
        return size;
    }
};


/* item full name in the url is needed ex: download/myFile.txt */
router.get('/', authorize(Role.Admin) ,function(req, res, next) { 

    
    var fileArray =[]

    var files=fs.readdirSync("./CloudContents")



    files.forEach((val,i)=>{
        var size=fs.statSync("./CloudContents/"+val).size
        var ext=path.extname("./CloudContents/"+val)
        if(ext.split(".")[1]!=undefined){

            fileArray.push([val,(size/(1024*1024)),ext.split(".")[1]])
        }
        else{
            var totalSize=0
            totalSize=getSizeFolderRecursive("./CloudContents/"+val)
            
            fileArray.push([val,(totalSize/(1024*1024)),"folder"])

        }
    })
    res.send(fileArray)

});

module.exports = router;
