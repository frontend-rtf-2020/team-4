const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const User = require('./model/User');
const apiRouter = require('./routes/routes');
const indexRouter = require('./routes/indexRouter');
//var usersRouter = require('./routes/users');
require('dotenv').config();
const app = express();


mongoose.connect(process.env.DB_CONNECTION_URL);

//здесь регистрируется стратегии(2-ой аргумент)
passport.use('register', null);

passport.use('authorize', null);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './frontend')));


app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use('/', indexRouter);

module.exports = app;
