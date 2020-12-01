var express = require('express');
var router = express.Router();
var {users}=require("../Autherization/users.json")


//TODO Can remove this route no need after sening username on the cookie

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    const user=users.find(u=>u.id===parseInt(req.params.id))
    res.json(user)
});

module.exports = router;
