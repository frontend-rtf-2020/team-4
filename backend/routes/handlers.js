
const User = require('../model/User');

function activate (req, resp, next) {
    User.findOneAndUpdate({activatorId: req.query.id}, { active: true }, (err, user) => {
        resp.send(err);
    });
}

const path = require('path');
const signUp = require('../../backend/passport/reg');
let express = require('express');
const passport = require('passport');
let router = express.Router();

passport.use('signUp', signUp);

router.post('/api/db_test', function(req, res, next) {
    console.log('received');
    res.sendFile(path.resolve("./frontend/index.html"));
});

module.exports = { activate };