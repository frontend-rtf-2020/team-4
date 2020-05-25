require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const initialise = require('./passport/init');
const passport = require('passport');
const flash = require('connect-flash'),
    bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const staticLocation = require('./staticLocation');
const app = express();


mongoose.connect(process.env.DB_CONNECTION_URL, {useNewUrlParser: true});

initialise(passport);

app.use(logger('dev'));
/** For passport correct work */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('anything'));
/** */
app.use(express.static(staticLocation));


app.use(session({ secret: 'anything',
    store: new MongoStore({ mongooseConnection: mongoose.connection }) }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
