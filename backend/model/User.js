const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto-js');

const User  = mongoose.model('User', new Schema({
    login : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        default : false,
        required : true,
    },
    activatorId : {
        type : String,
        required : false,          //Until not done activation by mail
        unique: true
    },
    registrationData : {
      type : Date,
      required : true,
      default : Date.now
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
