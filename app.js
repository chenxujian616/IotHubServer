var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入mongoose模块
let mongoose = require('mongoose')
// 导入dotenv模块
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
 * 现阶段能连上数据库，不能带username和password（如iot:iot@），带了连接不上数据库
 * curl命令格式要对，网址只能是http://localhost:3000
 * 代码位置只能在createError上方，在下方不能执行
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
// 寻找路由点跳到MongoDB
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
