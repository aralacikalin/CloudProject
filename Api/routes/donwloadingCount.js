var express = require('express');
var router = express.Router();
var fs =require("fs");

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");

//downloading more than 2 files break the server thats why we check here for how many downloads are open
router.get('/', authorize(Role.Admin), async function(req, res, next) { 

    var downloadingCount=0
    fs.readdir("./CloudContents", function(e,items){
        items.forEach((val,i)=>{
            if(val.includes("crdownload")){
                downloadingCount+=1
                
            }
        })
        
        res.json({count:downloadingCount})
    });
    

});

module.exports = router;