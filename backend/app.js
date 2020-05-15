require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const initialise = require('./passport/init');
const passport = require('passport');
const flash = require('connect-flash'),
    bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);/*
const apiRouter = require('./routes/routes');

const indexRouter = require('./routes/indexRouter');*/

const app = express();


mongoose.connect(process.env.DB_CONNECTION_URL, {useNewUrlParser: true});

initialise(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('anything'));
app.use(express.static(path.join(__dirname, './frontend')));


app.use(session({ secret: 'anything', //cookie: { maxAge: 100000 }, resave: true, saveUninitialized: false,//cookie: { maxAge: 60000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }) }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*
app.use('/api', apiRouter);
app.use('/', indexRouter);
*/
module.exports = app;
