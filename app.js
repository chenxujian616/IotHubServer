var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ����mongooseģ��
let mongoose = require('mongoose')
// ����dotenvģ��
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * �ֽ׶����������ݿ⣬���ܴ�username��password����iot:iot@�����������Ӳ������ݿ�
 * curl�����ʽҪ�ԣ���ַֻ����http://localhost:3000
 * ����λ��ֻ����createError�Ϸ������·�����ִ��
 */
/* mongoose.connect("mongodb://127.0.0.1:27017/iothub",
  { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
      console.log("connection failed");
    } else {
      console.log("connection succeeded")
    }
}) */
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// Ѱ��·�ɵ�����MongoDB
var deviceRouter = require('./routes/devices')
app.use('/devices', deviceRouter);

var tokensRouter = require("./routes/tokens")
app.use('/tokens',tokensRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
