const express = require('express');
const router = express.Router();
const passport = require('passport');
const { activate, RegistrationHandler } = require('./handlers');
const User = require('../model/User');

/* Only for testing */
router.get('/test', function(req, res, next) {
    res.send("OK!");
});

router.get('/db_test', function(req, resp, next) {
    User.find((err, res) => {
        resp.json(res);
    })
});

router.post('/reg', RegistrationHandler);

router.get('/activate', activate);

router.get('/reg/success', function (req, res, next) {
    res.send("You have successfully registered!")
});

router.get('/reg/error', function (req, res, next) {
    res.send("Lol. No")
});


module.exports = router;
