var express = require('express');
var router = express.Router();
var {exec} =require("child_process");
var fs =require("fs");
const { setInterval } = require('timers');

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");


//TODO authorization is not yet added
router.post('/',authorize(Role.Admin), async function(req, res, next) { 
    var url=req.body.url
    //TODO change this to sude python for pi
    exec(`python -u WebScraperScripts\\LinkDownloader.py ${url}`,(e,o,ee)=>{ console.log(e+o+ee)})
    var isDownloading=false
    var isDownloaded=false


    var loopCounter=0
    var loop=setInterval(function(){
        loopCounter=loopCounter+1
        console.log(loopCounter)
        fs.readdir("./CloudContents", function(e,items){
            items.forEach((val,i)=>{
                if(val.includes("crdownload")){
                    clearInterval(loop)
                    console.log("here")
                    // isDownloading=true
                    console.log(items+e)
                    console.log(val)
                    res.json({message:"Donwloading"})
                
                }
            })
            if(loopCounter>50){
                clearInterval(loop)
                res.sendStatus(408)
                
            }
        })

    },300)
    // while(!isDownloading){
    //     fs.readdir("./CloudContents", async function(e,items){
    //         console.log(items+e)
    //         items.forEach((val,i)=>{
    //             if(val.includes("crdownload")){
    //                 res.json({message:"asd"})
    //                 isDownloading=true
    //             }
    //         })
    //     })
    // }
    fs.readdir("./CloudContents",(e,items)=>{
        console.log(items+e)
    })
    //res.sendStatus(200)

});

module.exports = router;