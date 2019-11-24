const jwt = require('jsonwebtoken');
const UserDao = require("../dao/user-dao");

let createSecurityToken = (userData) => {

    return jwt.sign(userData.toJSON(), /* jwtSecret */ 'windy3495doan', {
        expiresIn: "5 days"
    });
};

let verifyToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, /* jwtSecret */  'windy3495doan', function (err, decodedAuth) {
            if (!decodedAuth) reject();
            else resolve(decodedAuth)
        });
    })
};

let decode = (req) => {
    return new Promise((resolve, reject) => {
        if (req.headers.authorization == null || req.headers.authorization.replace(/^Bearer /, '') == "null") {
            console.log("reject")
            reject();
            return;
        }
        let token = req.headers.authorization.replace(/^Bearer /, '');
        verifyToken(token).then(_token => resolve(_token));
    })
};

let identity =(req)=>{
    return new Promise((resolve, reject)=>{
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        resolve(ip) ;
    })

}

module.exports = {
    identity: (req, res,next)=> {
        identity(req).then(ip =>{
            req.ip = ip ;
            next()
        })
    },
    authorDetails: (req, res, next) => {
        decode(req).then((decodedAuth) => {
                UserDao.findOne({_id: decodedAuth._id}, {"password": 0}, (err, user) => {
                    req.user = user;
                    next();
                })
            }, () => {
                res.status(401).end();
            }
        )
    },
    isAdmin: (req, res, next) => {
        decode(req).then((decodedAuth) => {
                UserDao.findOne({_id: decodedAuth._id}, {"password": 0}, (err, user) => {
                    if (user.isAdmin) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).end();
                    }
                })
            }, () => {
                res.status(401).end();
            }
        )
    },
    createSecurityToken,
};




