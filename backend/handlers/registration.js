const crypto = require('bcrypt');
const emailCheck = require('email-check');
const User = require('../model/User');
const sendEmail = require("./sendActivatorMail");
const size = 10;

function activate (req, resp) {
    // eslint-disable-next-line no-unused-vars
    /*User.findOneAndUpdate({activatorId: req.query.activate}, { active: true }, (err, user) => {
        resp.send(err || "Successful activate");
    }); */
    User.findOne({activatorId: decodeURI(req.query.activate)}, (e, u) => {
        if(e)
        {
            console.log(e);
            resp.send(e);
        }
        else if (!u)
            resp.redirect('/activation?error=' +  encodeURI('Such user has not been found/'));
        else if(Math.abs(u.registrationData.valueOf() - Date.now().valueOf()) > 24*60*60*1000)
            //resp.send({error: "Activator link expired"});
            resp.redirect(`/activation?error=${encodeURI('The link has expired. Please press reactivate button to obtain new link.')}&activate=` + req.query.activate);
        else
            // eslint-disable-next-line no-unused-vars
            User.findOneAndUpdate({activatorId: req.query.activate}, { active: true }, (err, user) => {
                resp.redirect(err ? '/activation?error=' + encodeURI(err) : '/activation?result=' + encodeURI('Successful activation'))
                //resp.send(err || "Successful activate");
            });
    });

}

function reactivate (req, resp) {
    console.log('reactivate' + req.query.activate);
    User.findOne({activatorId: decodeURI(req.query.activate)}, (err, u) => {
        if(!u)
        {
            resp.redirect('/activation?error=' + encodeURI('Such user has not been found/'));
            return;
        }
        console.log(u.login);
        const activator = generateActivatorId(u.login);
        User.findByIdAndUpdate(u.id, {activatorId: activator, registrationData: Date.now()}, (err, u) => {
            sendEmail(u.email, activator)
                .then(i => {
                    console.log("sent");
                    console.log(i);
                    resp.redirect('/activation?result=' + encodeURI('New link has been sent.'))
                })
                .catch(i => resp.json(i))
        })
    })
}

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
                    newUser.activatorId = generateActivatorId(username);
                    // eslint-disable-next-line no-unused-vars
                    newUser.save(event => {
                        //console.log(event);
                        sendEmail(newUser.email, newUser.activatorId)
                            .then(i => {
                                console.log(i);
                                res.json({result: "OK"});
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

