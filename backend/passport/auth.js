let passport = require('passport');
import User from "../model/User"

let LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'identificator',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({username : username}, function(err, user){
err ? done(err) : user
            ? User.validPassword(password)
                ? done(null, user) : done(null, false, {message: 'Incorrect password.'})
            : done(null, false, {message: 'Incorrect email or login'});

    });
}));
