
const User = require('../model/User');
const signUp = require('../passport/reg');
const signIn = require('../passport/auth');
//здесь регистрируется стратегии(2-ой аргумент)
function initialize(passport) {
    passport.use('signUp' , signUp);

    passport.use('signIn' , signIn);

    passport.serializeUser((user , done)=>done(null , user._id));

    passport.deserializeUser((id , done)=>User.findById(id , (err , user)=>done(err , user)));

}

module.exports = initialize;
