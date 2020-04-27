const crypto = require('bcrypt');
const User = require('../model/User');
const sendEmail = require("./activator");
const size = 10;

function activate (req, resp) {
    User.findOneAndUpdate({activatorId: req.query.activate, email: req.query.email}, { active: true }, (err, user) => {
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

/** Это вообще что? Для тренировки? */

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

/** ???????????????????????????? */


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
                    newUser.activatorId = generateActivatorId();//Alfa version have not been tested
                    newUser.save(event => {
                        console.log(event);
                        sendEmail(newUser.email, newUser.activatorId);//Alfa version have not been tested
                    });
                    console.log('OLL KORREKT');
                }
                else
                    return alert(res.toString());//а это что? как и зачем в node работает alert? а response зачем в строку? надо просто res.send(<ошибка>)
            });
        }
        else
            return alert(res.toString());//надо просто res.send(<ошибка>)
    })
}

module.exports = { activate, RegistrationHandler };

