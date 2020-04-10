let LocalStrategy = require('passport').Strategy;
let crypto = require('bcrypt');
import User from "../model/User"
const salt = 888;

const signUp = new LocalStrategy((email, username, password, done) => {
    User.findOne({email : email}, (err, user) => {
        if(!user)
        {
            User.findOne({login : username}, (err, user) => {
                if(!user) {
                    const newUser = new User();
                    newUser.email = email;
                    newUser.hash = crypto.hash(password, salt).toString();
                    newUser.salt =
                    newUser.login = username;
                    newUser.save(event => {console.log(event)});
                }
                else return done(null, false, err /*{message: 'User with this username already exists'}*/);
                return done(null, user);
            });
        }
        else return done(null, false, {message: 'User with this e-mail address already exists'})
    });
});


module.exports = signUp;
