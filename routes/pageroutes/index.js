var http = require('http');
var request = require('request');

var url = global.CONFIG.news_url;

var newslisturl = url + '/v1/articleList';
var newsdetailurl = url + '/v1/articleDetail';

// 首页
exports.index = function(req, res) {
  res.render('index', {
    index: 'active',
    server: '',
    news: '',
    about: ''
  })
}

// 薪酬服务页面
exports.server = function(req, res) {
  res.render('server', {
    index: '',
    server: 'active',
    news: '',
    about: ''
  });
}

// 关于我们页面
exports.about = function(req, res) {
  res.render('about', {
    index: '',
    server: '',
    news: '',
    about: 'active'
  });
}

// 行业动态
exports.newslist = function(req, res) {
  var current_page = req.query.page || 1;
  request.post(newslisturl, { form: { page: current_page } }, function(err, httpResponse, body) {
    if (err) {
      console.log('error');
    }
    var data = JSON.parse(body);
    res.render('news', {
      index: '',
      server: '',
      news: 'active',
      about: '',
      data: (data.status == 200) ? data.data : ''
    });
  });
}

// 新闻详情
exports.newsdetail = function(req, res) {
  var id = req.query.id;
  if (!id) {
    res.redirect('/news');
    return false;
  }
  request.post(newsdetailurl, { form: { id: id } }, function(err, httpResponse, body) {
    if (err) {
      console.log('request newsDetail error');
    }
    var data = JSON.parse(body);
    res.render('detail', {
      index: '',
      server: '',
      news: 'active',
      about: '',
      data: (data.status == 200) ? data.data : ''
    });
  });
}
