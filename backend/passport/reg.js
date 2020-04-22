let passport = require('passport');
let LocalStrategy = require('passport').Strategy;
let crypto = require('bcrypt');
const User = require('../model/User');
const salt = 888;
const signUp = new LocalStrategy((email, username, password, done) => {User.findOne({email : email}, (err, user) => {
        if(!user)
        {
            console.log('correct1');
            User.findOne({login : username}, (err, user) => {
                if(!user) {
                    console.log('correct2');
                    const newUser = new User();
                    console.log('correct3');
                    newUser.email = email;
                    newUser.hash = crypto.hash(password, salt).toString();
                    newUser.login = username;
                    console.log('correct4');
                    newUser.save(event => {console.log(event)});
                    console.log('correct5');
                }
                else return done(null, false, {message: 'User with this username already exists'});
                return done(null, user);
            });
        }
        else return done(null, false, {message: 'User with this e-mail address already exists'})
    })
    }
);

module.exports = { signUp };
