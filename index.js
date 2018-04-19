const express = require('express');
var cors = require('cors')
var router = express.Router();
var proxy = require('express-http-proxy');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
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

/** ALL BASE URLS FOR SILOS, CHANGE AS NEEDED **/
const HR_API_BASE_URL = "http://kennuware-1772705765.us-east-1.elb.amazonaws.com/api";
const SALES_API_BASE_URL = "http://54.242.81.38";
const ACCOUNTING_API_BASE_URL = "https://swen-343-accounting-api.herokuapp.com";
const CS_API_BASE_URL = "https://api-customerservice.azurewebsites.net/api";
const MANUFACTURING_API_BASE_URL = "https://343-2175-manufacturing.azurewebsites.net/api";
const INVENTORY_API_BASE_URL = "https://inventory343.azurewebsites.net/api";

/** REDIRECT **/
router.use((req, res, next) => {
    var originUrl = req.originalUrl,
    url = "";
    console.log(originUrl);
    if(originUrl.includes('/hr-api')){ //prefix
        var split = originUrl.split('/hr-api'); //split by prefix
        url = HR_API_BASE_URL + split[1]; //new URL
    } else if (originUrl.includes('/sales-api')) { //prefix
        var split = originUrl.split('/sales-api'); //split by prefix
        url = SALES_API_BASE_URL + split[1]; //url
    } else if (originUrl.includes('/accounting-api')) { //prefix
        var split = originUrl.split('/accounting-api'); //split by prefix
        url = ACCOUNTING_API_BASE_URL + split[1]; //url
    } else if (originUrl.includes('/cs-api')) { //prefix
        var split = originUrl.split('/cs-api'); //split by prefix
        url = CS_API_BASE_URL + split[1]; //url
    } else if (originUrl.includes('/manufacturing-api')) { //prefix
        var split = originUrl.split('/manufacturing-api'); //split by prefix
        url = MANUFACTURING_API_BASE_URL + split[1]; //url
    }else if (originUrl.includes('/inventory-api')) { //prefix
        var split = originUrl.split('/inventory-api'); //split by prefix
        url = INVENTORY_API_BASE_URL + split[1]; //url
    } else {
        res.status(500).json({
            status: false,
            message: "URL not found."
        })
    }
    res.redirect(307, url);
});

app.use('/', router);

/** RUN APP */
var server = app.listen(port, function () {
    console.log('[SERVER] I\'m listening on PORT: ' +  port);
    server.emit("appStarted");
});

module.exports = server;

exports.close = function (callback) {
    server.close(callback);
};
