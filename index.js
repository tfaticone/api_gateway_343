const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
app.use(bodyParser.json()); // parse application/json

/** ALL ROUTES THAT DO NOT NEED AUTHENTICATION **/
var authApi = require('./routers/authApi');
router.use('/auth', authApi); //Api for messaging

app.get('/', function (req, res) {
    res.send('hello world')
});

/** VERIFICATION OF TOKEN **/
router.use((req, res, next) => {
    //GET THE BEARER TOKEN
    var bearer_header = req.headers['authorization'];
    var bearer_token = null;
    if(typeof bearer_header !== 'undefined') {
        const bearer = bearer_header.split(' ');
        bearer_token = bearer[1];
    }
    if (bearer_token) {
        jwt.verify(bearer_token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.json({success: false, message: 'Token did not authenticate.'})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.status(403).send({
            success: false,
            message: 'Token not found'
        })
    }
});


/** ALL ROUTES THAT NEED AUTHENTICATION **/
var testApi = require('./routers/testApi');
router.use('/test', testApi); //Api for messaging


app.use('/', router);

/** RUN APP */
app.listen(port, function () {
    console.log('[SERVER] I\'m listening on PORT: ' +  port);
});