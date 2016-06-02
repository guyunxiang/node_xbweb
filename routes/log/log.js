var fs = require('fs');
exports.access = function(req, res) {
  var arr = errarr = [];
  fs.readFile(process.cwd() + "/public/log/access.log", 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      arr = data.toString('utf8').split('\n');
      res.render('log/access', {
        data: arr
      });
    }
  });
};

exports.err = function(req, res) {
  var arr = [];
  fs.readFile(process.cwd() + "/public/log/error.log", 'utf-8', function(err, errdata) {
    if (err) {
      return console.log(err);
    }
    arr = errdata.toString('utf-8').split('\n');
    res.render('log/error', {
      data: arr
    });
  })
};
