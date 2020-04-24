let crypto = require('bcrypt');
const User = require('../model/User');
const size = 10;

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

// eslint-disable-next-line no-unused-vars
function RegistrationHandler(req, res, next)
{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({'email' : email}, (err, user) => {
        if(!user)
        {
            User.findOne({ 'login' : username}, (err, user) => {
                if(!user) {
                    const newUser = new User();
                    newUser.email = email;
                    newUser.hash = crypto.hashSync(password, size);
                    newUser.login = username;
                    newUser.activatorId = "ljdfgl";   // Need adding activatorGen
                    newUser.save(event => {console.log(event)});
                    console.log('OLL KORREKT');
                }
                else return alert(res.toString());
            });
        }
        else return alert(res.toString());
    })
}

module.exports = { activate, RegistrationHandler };
