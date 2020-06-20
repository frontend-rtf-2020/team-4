

const express = require('express');

const router = express.Router();
const { activate, RegistrationHandler, reactivate } = require('../handlers/registration');
const passport = require('passport');

const { getUserData, checkAuthenticated, checkNotAuthenticated, logout, findUser } = require('../handlers/handlers');

router.get('/logout', checkAuthenticated, logout);

router.get('/get_user_data',  checkAuthenticated, getUserData);

router.get('/activate', checkNotAuthenticated, activate);

router.post('/reg', RegistrationHandler);

router.get('/reactivate', reactivate);

router.post('/auth', checkNotAuthenticated, passport.authenticate('signIn', {
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/error',
    failureFlash : true
}));

router.get('/auth/error', function (req, res) {
    const mes = JSON.stringify(req.flash());
    console.log('Flash' + mes);
    res.send(mes);
});

router.get('/auth/success', checkAuthenticated, function (req, res) {
    res.send({ result: "You have successfully authorized!" })
});

router.get('/checkUser', checkAuthenticated, findUser);

module.exports = router;




