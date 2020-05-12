const User = require('../model/User');
const crypto = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const size = 10;



const signIn = new LocalStrategy((username, password, done) => {
    console.log('correct0');
    User.findOne({'email': username}, function (error, user) {

        if(user)
            //console.log(username, user, password);
            Authentication(user, password, done);


        else
            //console.log(username, user, password);
            User.findOne({'login': username}, Authentication(user, password, done));

    });


    function Authentication(user, password, done) {
        if (user) {
            console.log('correct1');
            if (user.active === true) {
                console.log('correct2');
                //const currHash = crypto.hashSync(password, size);
                if (/*user.hash === currHash*/crypto.compareSync(password, user.hash))
                    return done(null, user);
                else return done(null, false, {message: 'Wrong password'});
            } else return done(null, false, {message: 'Activate your account by the link sent to your email'});
        }
        else return done(null, false, {message: 'Wrong login or email'});
    }
});



module.exports = signIn;
