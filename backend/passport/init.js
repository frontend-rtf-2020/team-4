
const User = require('../model/User');
//const signUp = require('../passport/reg');
const signIn = require('../passport/auth');
//здесь регистрируется стратегии(2-ой аргумент)
function initialize(passport) {
    //passport.use('signUp' , signUp);

    passport.serializeUser((user , done) => {
        console.log(user);
        done(null , user._id)
    });

    passport.deserializeUser((id , done) => User.findById(id /*, (err , user) => done(err , user))*/)
        .then(u => done(null, u))
        .catch(e => done(e)));

    passport.use('signIn' , signIn);


}

module.exports = initialize;
