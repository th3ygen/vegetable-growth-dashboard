const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sysConfRouter = require('./routes/sysConf');

/* mongodb connect */
require('./mongodb').connect();

/* load models */
require('./models/SysConf');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/users', usersRouter);
app.use('/api/sysConf', sysConfRouter);

require('pretty-error').start();

module.exports = app;
