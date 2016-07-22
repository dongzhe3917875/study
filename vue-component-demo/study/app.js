var express = require('express');
var birds = require('./routes/bird');
var path = require('path');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./routes/index');
var cookieParser = require('cookie-parser');
var flash = require("connect-flash");
var settings = require("./setting");
var blog = require('./routes/blog');
var operate_svg = require('./routes/operate_svg');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

app.use(session({
  secret: settings.cookieSerect,
  key: settings.db,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));

var test = require('./routes/test');
var http = require("http");


// 引入socekt.io
var server_http = http.Server(app);
var io = require("socket.io")(server_http);
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
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
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
app.use('/blog', blog);
app.use('/', operate_svg);
app.route('/book')
  .get(function(req, res) {
    // 可以使用sendfile来传输文件
    // res.sendFile(__dirname + '/index.html');
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
// socket.io demo
var onlineUsers = {};
var onlineCount = 0;
io.on("connection", function(socket) {
  var connected = "欢迎进入聊天！！"
  var disconnected = "已经退出聊天"
  console.log('a user connected');
  // socket.on("disconnect", function() {
  //   console.log('user disconnected');
  // });
  // socket.broadcast.emit(connected);
  // io.emit('chat message', connected);
  // socket.on("chat message", function(msg) {
  // console.log("message from client: " + msg);
  // 都看见
  // io.emit('chat message', msg);
  // 只有对方看见
  // socket.broadcast.emit('chat message', msg);
  // })

  socket.on("login", function(obj) {
    socket.name = obj.userid;
    if (!onlineUsers.hasOwnProperty(obj.userid)) {
      onlineUsers[obj.userid] = obj.username;
      onlineCount++;
    }

    io.emit('login', {
      onlineUsers: onlineUsers,
      onlineCount: onlineCount,
      user: obj
    })
    console.log(obj.username + '加入了聊天室');
  })

  socket.on('disconnect', function() {
    //将退出的用户从在线列表中删除
    if (onlineUsers.hasOwnProperty(socket.name)) {
      //退出用户的信息
      var obj = {
        userid: socket.name,
        username: onlineUsers[socket.name]
      };

      //删除
      delete onlineUsers[socket.name];
      //在线人数-1
      onlineCount--;

      //向所有客户端广播用户退出
      io.emit('logout', {
        onlineUsers: onlineUsers,
        onlineCount: onlineCount,
        user: obj
      });
      console.log(obj.username + '退出了聊天室');
    }
  });

  socket.on("message", function(obj) {
    //向所有客户端广播发布的消息
    io.emit('message', obj);
    console.log(obj.username + '说：' + obj.content);
  })
})


server_http.listen(1741, function() {
  console.log((new Date()) + ' Server is listening on port 1741');
})

// websocket demo
var socket_server = http.createServer(function(request, response) {});
socket_server.listen(1740, function() {
    console.log((new Date()) + ' Server is listening on port 1740');
  })
  // 通过http建立websocket server
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
  httpServer: socket_server
});
var connection;
var timeID = null;
wsServer.on('request', function(req) {
  // 建立WebSocket连接connection
  connection = req.accept('echo-protocol', req.origin);
  clearInterval(timeID);
  connection.sendUTF("dongzhe is a very good man");

  var timeID = setInterval(function() {
      console.log(Math.random())
      connection.sendUTF(Math.random());
    }, 2000)
    // 填写message信息
  connection.on("message", function(message) {
    console.log(JSON.stringify(JSON.parse(message.utf8Data)));
    if (JSON.parse(message.utf8Data).clear_interval) {
      clearInterval(timeID);
    }
    var msgString = message.utf8Data + " dongzhe is good";
    connection.sendUTF(msgString);
  })

  connection.on('close', function(reasonCode, description) {
    console.log(connection.remoteAddress + ' disconnected.');
  });
})
