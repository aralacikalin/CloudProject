var express = require('express');
var router = express.Router();

/* item full name in the url is needed ex: download/myFile.txt */
router.get('/:item', function(req, res, next) { 
    let item=req.params.item;
    res.download("./CloudContents/"+item,item)
});

module.exports = router;
