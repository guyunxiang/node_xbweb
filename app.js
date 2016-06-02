var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var app = express();

// 适用于开发环境
if (app.get('env') == 'development') {
  global.CONFIG = config.development;
  app.set('port', process.env.PORT || 3001);
}

// 适用于预发布环境
if (app.get('env') == 'preProduction') {
  global.CONFIG = config.preProduction;
  app.set('port', process.env.PORT || 3002);
}

// 适用于生产环境
if (app.get('env') == 'production') {
  global.CONFIG = config.production;
  app.set('port', process.env.PORT || 3000);
}

// 引入路由
var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由
routes(app);

var server = app.listen(app.get('port'), function() {
  console.log('Listenning on port %d', server.address().port);
});
