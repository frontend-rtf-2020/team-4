
const LocalStrategy = require('passport-local').Strategy;
let crypto = require('bcrypt');
const User = require('../model/User');


const salt = 888;
const signUp = new LocalStrategy((email, username, done, password) => {
    console.log('correct0');
    User.findOne({'email' : email}, (err, user) => {
        console.log(email);
        console.log(username);
        console.log(password);

        if(!user)
        {
            console.log('correct1');
            User.findOne({ 'login' : username}, (err, user) => {
                if(!user) {
                    console.log('correct2');
                    const newUser = new User();
                    console.log('correct3');
                    newUser.email = email;

                    crypto.hash(password, salt, function(err, hash) {
                        newUser.hash = hash;
                    });

                    newUser.hash = crypto.hash(password, salt).toString();
                    //newUser.salt =

                    newUser.login = username;
                    console.log('correct4');
                    newUser.save(event => {console.log(event)});
                    console.log('OLL KORREKT');
                }
                else return done(null, false, {message: 'User with this username already exists'});
                return done(null, user);
            });
        }
        else return done(null, false, {message: 'User with this e-mail address already exists'})
    })
    }
);

module.exports = signUp ;
