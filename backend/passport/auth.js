const User = require('../model/User');
const crypto = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;



const signIn = new LocalStrategy((username, password, done) => {
    console.log('correct0');
    User.findOne({$or: [{'email': username}, {'login': username}]}, (error, user) => Authentication(user, password, done));

    function Authentication(user, password, done) {
        if (user) {
            console.log('correct1');
            if (user.active) {
                console.log('correct2');
                if (crypto.compareSync(password, user.hash))
                    return done(null, user);
                else return done(null, false, {message: 'Wrong password'});
            } else return done(null, false, {message: 'Activate your account by the link sent to your email'});
        }
        else return done(null, false, {message: 'Wrong login or email'});
    }
});



module.exports = signIn;
