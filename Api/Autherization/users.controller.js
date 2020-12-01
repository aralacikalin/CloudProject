const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('../_helpers/authorize')
const Role = require('../_helpers/role');
const jwt = require('jsonwebtoken');
const {secret}=require("../config.json")

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Role.Admin) , getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
router.get('/username', authorize(), getUser);       // get username
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate({username:req.body.username,password:req.body.password})
        .then(user => {
            if(user){
                res.cookie("jwt",user ,{httpOnly: false,expires: req.body.rememberme? new Date(Date.now() + (14*24*60*60*1000)):0});
                res.json(user)
            }else{
                return res.status(400).json({ message: 'Username or password is incorrect' })
            }
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getUser(req,res,next){
    //const currentUser=req.user;
    //userService.getById(currentUser.sub).then(user=>user?res.json(user.username):res.sendStatus(404))
    const token=res.cookie.jwt
    const user=jwt.verify(token,secret)
    userService.getById(user.sub)
    res.json(userService.getById(user.sub).then(user=>user.username))
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}