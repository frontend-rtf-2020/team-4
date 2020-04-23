
const User = require('../model/User');
const path = require('path');
const signUp = require('../../backend/passport/reg');
const express = require('express');
const passport = require('passport');
const router = express.Router();

passport.use('signUp', signUp);

router.post('/api/db_test', function(req, res) {
    console.log('received');
    res.sendFile(path.resolve("./frontend/index.html"));
});

function activate (req, resp) {
    User.findOneAndUpdate({activatorId: req.query.id}, { active: true }, (err, user) => {
        resp.send(err);
    });
}

// eslint-disable-next-line no-unused-vars
function generateActivatorId() {
    let res = '';
    for (let i = 0; i < 10; i++)
        res += String.fromCodePoint(Math.round(48 + Math.random() * 74));
    return res;
}

module.exports = { activate };
