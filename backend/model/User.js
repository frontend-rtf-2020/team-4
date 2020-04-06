const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    hash : {
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
module.exports = User;
