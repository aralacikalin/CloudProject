var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path')





var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) //Appending file original name
    }
});


var upload = multer({ storage: storage });
router.post('/', upload.single('file'), (req, res) => {
    return res.status(200).send(req.file)
});

module.exports = router;
