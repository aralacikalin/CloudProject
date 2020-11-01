var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var reqData =  req.body;
    if(reqData["username"] === "Admin" && reqData["username"] !== null && reqData["username"] !== "" && reqData["password"] === "Admin" && reqData["password"] !== null && reqData["password"] !== "") 
    {
        return res.status(200).send({"flag":true}) 
    } else {
        return res.status(200).send({"flag":true})
    }
});

module.exports = router;
