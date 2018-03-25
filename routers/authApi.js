var express = require('express');
const jwt = require('jsonwebtoken');
var authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        result = db.collection('users').findOne({
            username: req.body.username,
            password: req.body.password
        }, (err, result) => {
           if(result) {
               jwt.sign({result}, 'secretkey', (err, token) => {
                   res.json({
                       token
                   })
               })
           } else {
               res.json({
                   status: false,
                   message: 'User account not found'
               })
           }
        });
    }
});

module.exports = authRouter;