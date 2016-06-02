// 页面路由
var index = require('./pageroutes/index');
// 接口路由
var api = require('./api/news');

module.exports = function(app) {
  // 首页
  app.get('/', index.index);
  // 薪酬服务页面
  app.get('/server', index.server);
  // 行业动态
  app.get('/news', index.newslist);
  // 新闻详情
  app.get('/detail', index.newsdetail);
  // 关于我们
  app.get('/about', index.about);

  // 404
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // 500
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}
