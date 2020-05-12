const crypto = require('bcrypt');
const emailCheck = require('email-check');
const User = require('../model/User');
const sendEmail = require("./activator");
const size = 10;

function activate (req, resp) {
    // eslint-disable-next-line no-unused-vars
    User.findOneAndUpdate({activatorId: req.query.activate}, { active: true }, (err, user) => {
        resp.send(err || "Successful activate");
    });
}

// eslint-disable-next-line no-unused-vars
function generateActivatorId (login) {//TODO: Rewrite?
    let res = login;
    for (let i = 0; i < 15; i++)
        res += String.fromCodePoint(Math.round(48 + Math.random() * 74));
    return res;
}

async function RegistrationHandler(req, res)
{
    const username = req.body.username;
    const email = req.body.email;
    const isEmailValid = await emailCheck(email);
    if(!isEmailValid)
    {
        await res.json({error: "Email is incorrect, you can use only existing email which can be accessed to allow you activate the account."});
        return;
    }
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
                    newUser.activatorId = generateActivatorId(username);//Alfa version have not been tested
                    // eslint-disable-next-line no-unused-vars
                    newUser.save(event => {
                        //console.log(event);
                        sendEmail(newUser.email, newUser.activatorId)
                            .then(i => {
                                console.log(i);
                                res.json({result: "OK"});
                                //if error => delete user
                            })
                            .catch(i =>
                            {
                                //console.log(i);
                                res.json(i);
                            });//Alfa version have not been tested

                    });
                    console.log('OLL KORREKT');

                }
                else
                    res.json({error: "Such user already exists"});
            });
        }
        else
            res.json({error: "Such user already exists"});
    })
}

module.exports = { activate, RegistrationHandler};

