const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const inittialze = require('./passport/init');
const passport = require('passport');
const session = require("express-session");
const apiRouter = require('./routes/routes');
const indexRouter = require('./routes/indexRouter');
//require('dotenv').config();
const app = express();


mongoose.connect(process.env.DB_CONNECTION_URL);

inittialze(passport);

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
