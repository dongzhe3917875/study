var express = require('express');
var birds = require('./routes/bird');
var path = require('path');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./routes/index');
var test = require('./routes/test');
// var newuser = require('./routes/newuser')
var db = monk('localhost:27017/nodetest');
// 使用这个router来配置路由
var router = express.Router();
var bodyParser = require('body-parser');
// 设置模板文件夹的路径
// __dirname：开发期间，该行代码所在的目录。

// express4 的中间件机制 使用use来注册中间件 中间件使用next来决定是否调用
// 下一个中间件
app.use(function(req, res, next) {
  console.log('Time: ', new Date());
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
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
app.all("*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })
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
app.use('/', routes);
app.use('/', test);
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

app.listen(3000, function() {
  console.log('app is listening at localhost:3000');
})

// 路由组件
