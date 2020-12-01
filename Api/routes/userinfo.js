var express = require('express');
var router = express.Router();
var {users}=require("../Autherization/users.json")


/* GET users listing. */
router.get('/:id', function(req, res, next) {
    const user=users.find(u=>u.id===parseInt(req.params.id))
    res.json(user)
});

module.exports = router;
