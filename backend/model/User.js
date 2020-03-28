const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto-js');

const User  = mongoose.model('User', new Schema({
    login : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    }
}));

/**User.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(100).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 888, 64, `sha512`).toString(`hex`);
};

User.methods.validPassword = function(password){
        let currentHash = crypto.pbkdf2Sync(password, this.salt, 888, 64, `sha512`).toString(`hex`);
        return this.hash === currentHash;
};*/
module.exports = User;
