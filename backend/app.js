var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/routes');
//var usersRouter = require('./routes/users');

var app = express();


//mongoose.connect("");//здесь должна быть строка подключения

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/api', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;
