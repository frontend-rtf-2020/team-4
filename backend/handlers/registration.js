const crypto = require('bcrypt');
const emailCheck = require('email-check');
const User = require('../model/User');
const sendEmail = require("./sendActivatorMail");
const { v5: uuidv5} = require('uuid');

const size = 10;
const day = 24*60*60*1000;
//import { v5 as uuidv5, v4 as uuidv4 } from 'uuid';
const namespase = "232db7a9-94ae-5a90-80e1-93ccee46fcde";

function activate (req, resp) {
    // eslint-disable-next-line no-unused-vars
    User.findOne({activatorId: decodeURI(req.query.activate)}, (err, user) => {
        if(err)
        {
            console.log(err);
            resp.send(err);
        }
        else if (!user)
            resp.redirect('/activation?error=' +  encodeURI('Such user has not been found/'));
        else if(Math.abs(user.registrationData.valueOf() - Date.now().valueOf()) > day)
            resp.redirect(`/activation?error=${encodeURI('The link has expired. Please press reactivate button to obtain new link.')}&activate=` + req.query.activate);
        else
            // eslint-disable-next-line no-unused-vars
            User.findOneAndUpdate({activatorId: req.query.activate}, { active: true }, (err, user) => {
                resp.redirect(err ? '/activation?error=' + encodeURI(err) : '/activation?result=' + encodeURI('Successful activation'))
            });
    });

}

function reactivate (req, resp) {
    console.log('reactivate' + req.query.activate);
    User.findOne({activatorId: decodeURI(req.query.activate)}, (err, user) => {
        if(!user)
        {
            resp.redirect('/activation?error=' + encodeURI('Such user has not been found/'));
            return;
        }
        console.log(user.login);
        const activator = generateActivatorId(user.login);
        User.findByIdAndUpdate(user.id, {activatorId: activator, registrationData: Date.now()}, (err, user) => {
            sendEmail(user.email, activator)
                .then(i => {
                    console.log("sent");
                    console.log(i);
                    resp.redirect('/activation?result=' + encodeURI('New link has been sent.'))
                })
                .catch(i => resp.json(i))
        })
    })
}

function generateActivatorId (login) {
    return uuidv5(login, namespase);
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
    User.findOne({email}, (err, user) => {
        if(!user)
        {
            User.findOne({ 'login' : username}, (err, user) => {
                if(!user) {
                    const newUser = new User();
                    newUser.email = email;
                    newUser.hash = crypto.hashSync(password, size);
                    newUser.login = username;
                    newUser.activatorId = generateActivatorId(username);
                    // eslint-disable-next-line no-unused-vars
                    newUser.save( () => {
                        sendEmail(newUser.email, newUser.activatorId)
                            .then(i => {
                                console.log(i);
                                res.send('{}');
                            })
                            .catch(i =>
                            {
                                res.json(i);
                            });
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

module.exports = { activate, RegistrationHandler, reactivate};

