let passport = require('passport');
let LocalStrategy = require('passport').Strategy;
let crypto = require('crypto-js');
import User from "../model/User"

passport.use(new LocalStrategy((email, username, password, done) => {
    User.findOne({email : email}, (err, user) => {
        if(!user)
        {
            User.findOne({login : username}, (err, user) => {
                if(!user) {
                    const newUser = new User();
                    newUser.email = email;
                    newUser.hash = CryptoJS.MD5(password).toString();
                    newUser.login = username;
                    newUser.save(event => {console.log(event)});
                }
                else return done(null, false, {message: 'User with this username already exists'});
                return done(null, user);
            });
        }
        else return done(null, false, {message: 'User with this e-mail address already exists'})
    })
    }
));
