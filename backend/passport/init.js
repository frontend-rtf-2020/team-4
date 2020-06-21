
const User = require('../model/User');
const signIn = require('../passport/auth');
function initialize(passport) {

    passport.serializeUser((user , done) => {
        console.log(user);
        done(null , user._id)
    });

    passport.deserializeUser((id , done) => User.findById(id)
        .then(u => done(null, u))
        .catch(e => done(e)));

    passport.use('signIn' , signIn);


}

module.exports = initialize;
