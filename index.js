const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('api_gateway_343', 'tfaticone', 'pass1234', {
    host: 'api-gateway-343.cspllbshelpx.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/** AUTHENTICATE CONNECTION TO AWS **/
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

/** AWS MODELS **/
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM,
        values: ['employee', 'customer']
    },
    outside_id: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
});

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