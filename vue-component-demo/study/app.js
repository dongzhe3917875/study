var express = require('express');
var birds = require('./routes/bird');
var path = require('path');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./routes/userlist');
var db = monk('localhost:27017/nodetest');
// 设置模板文件夹的路径
// __dirname：开发期间，该行代码所在的目录。
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.render("index", {
    name: "dongzhe",
    age: 22
  });
});
// app.use(function(req, res, next) {
//   if (req.url === "/") {
//     res.writeHead(200, {
//       "Content-Type": "text/plain"
//     });
//     res.end("Welcome to the homepage!\n");
//   } else {
//     next();
//   }
// });
//
// app.use(function(req, res, next) {
//   if (req.url === "/about") {
//     res.writeHead(200, {
//       "Content-Type": "text/plain"
//     });
//     res.end("about page!\n");
//   } else {
//     next();
//   }
// });
//
// app.use(function(req, res, next) {
//   res.writeHead(404, {
//     "Content-Type": "text/plain"
//   });
//   res.end("404 error!\n");
// });


app.use('/birds', birds);
// 对同一个路径做不同的请求方法配置，如下，
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
app.get('/userlist', routes.userlist(db));
app.listen(3000, function() {
  console.log('app is listening at localhost:3000');
})

// 路由组件
