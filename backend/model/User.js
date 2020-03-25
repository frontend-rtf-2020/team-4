const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User  = mongoose.model('User', new Schema({
    login: String,
    email: String,
    password: String
}));

module.exports = User;
