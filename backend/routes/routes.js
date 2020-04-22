const express = require('express');
const router = express.Router();
const passport = require('passport');
const { activate } = require('./handlers');
const passport = require("passport");
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

router.post('/registration', passport.authenticate('signUp', {
    successRedirect: '/registration/success',
    failureRedirect : '/registration/error'
}));

router.get('/registration/success', function (req, res, next) {
    res.send("You have successfully registered!")
});

router.get('/registration/error', function (req, res, next) {
    res.send("Lol. No")
});


router.get('/activate', activate);
router.post('/registration', passport.authenticate('signUp', {
    successRedirect: '/registration/success',
    failureRedirect : '/registration/error'
}));

router.get('/registration/success', function (req, res, next) {
    res.send("You have successfully registered!")
});

router.get('/registration/error', function (req, res, next) {
    res.send("Lol. No")
});


module.exports = router;
