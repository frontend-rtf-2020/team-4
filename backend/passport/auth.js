const User = require('../model/User');
const crypto = require('bcrypt');
let LocalStrategy = require('passport-local').Strategy;
const size = 10;



const signIn = new LocalStrategy((identifier, password, done) => {
    console.log('correct0');
    User.findOne({'email': identifier}, user => {
        if (user)
            Authentication(user, password, done);
        else
            User.findOne({'login': identifier}, user => Authentication(user, password, done));
    });


    function Authentication(user, password, done) {
        if (user) {
            console.log('correct1');
            if (user.active === true) {
                console.log('correct2');
                const currHash = crypto.hashSync(password, size);
                if (user.hash === currHash)
                    return done(null, true, user);
                else return done(null, false, {message: 'Wrong password'});
            } else return done(null, false, {message: 'Wrong login or email'});
        }
        else return done(null, false, {message: 'Activate your account by the link sent to your email'});
    }
});



module.exports = signIn;
