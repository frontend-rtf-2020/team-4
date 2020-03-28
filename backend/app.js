var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
var apiRouter = require('./routes/routes');
const indexRouter = require('./routes/indexRouter');
//var usersRouter = require('./routes/users');
require('dotenv').config();
var app = express();


mongoose.connect(process.env.DB_CONNECTION_URL);//здесь должна быть строка подключения

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
