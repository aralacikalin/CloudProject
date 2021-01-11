var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path')

var authorize =require("../_helpers/authorize");
var Role =require("../_helpers/role");





var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'CloudContents/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) //Appending file original name
    }
});


var upload = multer({ storage: storage });
router.post('/',authorize(Role.Admin)  , upload.single('file'), (req, res) => {
    return res.status(200).send(req.file)
});

module.exports = router;
