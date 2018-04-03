var express = require('express');
const jwt = require('jsonwebtoken');
var authRouter = express.Router();
var models= require('../models');
var sequelize = require('sequelize');


authRouter.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        models.users.findOne({
            attributes: ['username', 'password'],
            where: {
                username: req.body.username,
                password: req.body.password,
            }
        }).then((result) => {
           if(result) {
               jwt.sign({result}, 'secretkey', (err, token) => {
                   res.json({
                       token,
                       status: true
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

authRouter.post('/create', (req, res) => {
    if(req.body.username && req.body.password) {
        models.users.count({
            where: {
                username: req.body.username
            }
        }).then((result) => {
            if(result === 0) {
                models.users.create({
                    username: req.body.username,
                    password: req.body.password
                }).then((result) => {
                    jwt.sign({
                        username: result.dataValues.username,
                        password: result.dataValues.password,
                        id: result.dataValues.id
                    }, 'secretkey', (err, token) => {
                        res.json({
                            token,
                            status: true,
                            message: 'Account Created'
                        })
                    });
                });
            } else {
                res.json({
                    status: false,
                    message: 'Username already in use'
                })
            }
        });
    } else {
        res.json({
            status: false,
            message: 'Improper Input'
        })
    }
});

module.exports = authRouter;