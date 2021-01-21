var express = require('express');
var router = express.Router();
var {exec} =require("child_process");
var fs =require("fs");
const { setInterval } = require('timers');

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");


router.post('/',authorize(Role.Admin), async function(req, res, next) { 
    var url=req.body.url
    //TODO change this to sude python for pi
    exec(`python -u WebScraperScripts\\TorrentDownloaderFire.py ${url}`, (e,o,ee)=>{ 
        console.log(e+o+ee)
        if(o.includes("OK")){
            res.json({message:"Donwloading"})
        }
        else{
            res.sendStatus(408)
        }
    })


    /*
    var currentTime=new Date().getTime()

    var loopCounter=0
    var loop=setInterval(function(){
        loopCounter=loopCounter+1
        console.log(loopCounter)
        fs.readdir("./TorrentDownloads", function(e,items){
            items.forEach((val,i)=>{
                fs.stat("./TorrentDownloads/"+val,function(e,stats){
                    if(stats.birthtime.getTime()>currentTime){

                        clearInterval(loop)
                        console.log("here")
                        // isDownloading=true
                        res.json({message:"Donwloading"})
                    }
                })
                
            })
        })
        
        if(loopCounter>150){
            clearInterval(loop)
            res.sendStatus(408)
            
        }
    },300)*/
    

});

module.exports = router;