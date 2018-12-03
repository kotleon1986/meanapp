const express = require('express');
const path = require('path');
const logger = require('./services/logger');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// view engine setup
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// environment variables
require('dotenv').load();

// passport init
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors
app.use(cors());
const allowCrossDomain = (req, res, next) => {
    console.log('origin: ', process.env.FRONTEND_DOMAIN);
    const origin = process.env.FRONTEND_DOMAIN;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};

// static folder (only for images)
app.use(express.static(path.resolve('./public')));

app.disable('etag');

// router
const router = require('./routes');
app.use('/api', router);

// error handler
const errorHandler = require('./handlers/error');
app.use(errorHandler);

// uncaught exceptions
process.on('uncaughtException', (exception) => {
    logger.error(exception.stack);
    if(process.env.NODE_ENV !== 'development') {
        process.exit(1);
    }

    return false;
});

module.exports = app;
