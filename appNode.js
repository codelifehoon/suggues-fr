'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serverProxy = require('./routes/serverProxy');
var app = express();

import oAuthManager from './com/oAuth/oAuthManager';
import winston from 'winston';
import RouteConfig from '~/routes/RouteConfig';

let oam = new oAuthManager();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('encrypt'));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route 설정집합
RouteConfig.setRoutes(app);

oam.oAuthInit(app);


winston.level='debug';

// var sProxy = new serverProxy();
// sProxy.initProxy('127.0.0.1:7070',app);


// CROS 설정
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('페이지가 존재하지 않습니다.');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;



