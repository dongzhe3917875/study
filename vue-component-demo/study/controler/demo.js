exports.chat = function(req, res) {
  res.render("socket_chat", {});
}
exports.iochat = function(req, res) {
  res.render("socketIO_chat", {
    user: req.session.user
  });
}
exports.iochat_login = function(req, res) {
  res.render("socketIO_chat_login", {});
}
exports.iochat_register = function(req, res) {
  res.render("socketIO_chat_register", {});
}
exports.home = function(req, res) {
  res.render("socketIO_chat_home", {
    user: req.session.user
  });
}
var crypto = require('crypto');
var User = require('../models/user.js');
exports.register = function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var password_re = req.body.password_re;
  res.header("Content-Type", "application/json;charset=utf-8");
  if (password_re !== password) {
    return res.send({
      error: "密码输入的不一致，请检查"
    })
  }
  var md5 = crypto.createHash("md5");
  password = md5.update(password).digest('hex');
  var newUser = new User({
    name: name,
    password: password,
    email: req.body.email
  })

  User.get(name, function(err, user) {
    if (err) {
      return res.send({
        error: "数据库系统繁忙"
      })
    }
    if (user) {
      return res.send({
        error: "用户名已存在"
      })
    } else {

      newUser.save(function(err, user) {

        if (err) {
          return res.send({
            error: "注册失败，请稍后再试"
          })
        }
        console.log(JSON.stringify(user));
        // 将用户信息放到session里面
        // req.session.user = user;
        req.flash("success", "注册成功");
        // res.location("socketIO_chat/login");
        // And forward to success page
        // res.redirect("/socketIO_chat/login");
        return res.send({
          success: "注册成功，请去登录",
          location: "/socketIO_chat/login"
        })
      })
    }
  })
}
exports.login = function(req, res) {
  var md5 = crypto.createHash("md5");
  var password = md5.update(req.body.password).digest("hex");
  // 验证用户信息
  User.get(req.body.name, function(err, user) {
    if (err) {
      return res.send({
        error: "数据库系统繁忙"
      })
    }
    if (!user) {
      return res.send({
        error: "用户名不存在"
      })
    }
    if (user.password != password) {
      return res.send({
        error: "密码不正确"
      })
    }
    req.session.user = user;
    return res.send({
      success: "登录成功",
      location: "/socketIO_chat/home"
        // location: "/socketIO_chat"
    })
  })
}
exports.logout = function(req, res) {
  req.session.user = null;
  return res.send({
    success: "退出账户成功",
    location: "/socketIO_chat/login"
  })
}
