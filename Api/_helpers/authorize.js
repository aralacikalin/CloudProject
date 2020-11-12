//const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');
const role = require('./role');


module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }


    
    return [
        // authenticate JWT token and attach user to request object (req.user)
        (req,res,next)=>{
            const token =req.cookies.jwt
            console.log(token)
            const user=jwt.verify(token,secret)
            if(roles.length&&!roles.includes(user.role)){
                return res.status(401).json({ message: 'Unauthorized' });

            }
            next();
        }
    ];
}