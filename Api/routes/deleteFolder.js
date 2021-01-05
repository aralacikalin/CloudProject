var express = require('express');
var router = express.Router();
var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");
var fs=require("fs");

deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/* item full name in the url is needed ex: download/myFile.txt */
router.delete('/:item(*)' ,authorize(Role.Admin), function(req, res, next) { 
    let item=req.params.item;
    var deletePath="./CloudContents/"+item
    try {
        deleteFolderRecursive(deletePath)
        res.sendStatus(202)
    } catch (error) {
        res.sendStatus(404)
    }
});

module.exports = router;
