var express = require('express');
var testRouter = express.Router();

testRouter.get('/', (req, res) => {
   res.json({
       message: "Returned",
   })
});

testRouter.post('/users', (req, res) => {
    if(req.body.username && req.body.password && req.body.type && req.body.id) {
        db.collection('users').find({ username: req.body.username }).count().then((result) => {
            if(result === 0) {
                db.collection('users').save(req.body, (err, result) => {
                    if (err) return console.log(err);

                    res.json({
                        status: true,
                        message: 'Account Created'
                    })
                })
            } else {
                res.json({
                    status: false,
                    message: 'Username already in use'
                })
            }
        });
    } else {
        res.statusCode(404);
    }
});

module.exports = testRouter;