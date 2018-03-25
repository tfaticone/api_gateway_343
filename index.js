const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json()); // parse application/json

/** ALL ROUTES THAT DO NOT NEED AUTHENTICATION **/
var authApi = require('./routers/authApi');
router.use('/auth', authApi); //Api for messaging

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




MongoClient.connect('mongodb://admin:admin1234@ds123499.mlab.com:23499/users', (err, client) => {
    if (err) return console.log(err);
    db = client.db('users'); // whatever your database name is

    /** RUN APP */
    app.listen(port, function () {
        console.log('[SERVER] I\'m listening on PORT: 3000');
    });
});