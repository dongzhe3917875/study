var Post = require('../models/blog.js');
var User = require('../models/user.js');
exports.post = function(req, res) {
  res.render("postBlog", {})
}

exports.post_blog = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.markdown,
    req.body.subject, req
    .body.post);
  console.log(post);
  post.save(function(err) {
    if (err) {
      return res.send({
        error: err
      })
    }
    return res.send({
      success: "发表成功！",
      location: "/socketIO_chat/home"
    })
  })
}

exports.upload = function(req, res, next) {
  // res.header("Content-Type", "application/json;charset=utf-8");
  console.log("****")
  console.log(req.file);
  console.log("****")
  return res.send({
    success: "上传成功",
    path: req.file.filename
  })
}

exports.list = function(req, res) {
  User.get(req.params.name, function(err, user) {
    if (!user) {
      res.redirect('/socketIO_chat/home');
    }
    Post.getAll(user.name, function(err, posts) {
      if (err) {
        return res.redirect('/socketIO_chat/home');
      }
      res.render("blog_list", {
        user: req.session.user,
        posts: posts
      });
    })
  })
}
exports.listone = function(req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function(err,
    post) {
    if (err) {
      return res.send({
        error: "error"
      })
    }
    res.render('article', {
      user: req.session.user,
      title: req.params.title,
      post: post
    })
  })
}

exports.edit = function(req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function(err,
    post) {
    if (err) {
      return res.send({
        error: "error"
      })
    }
    res.render('article_edit', {
      user: req.session.user,
      title: req.params.title,
      post: post
    })
  })
}

exports.update_post = function(req, res) {
  var currentUser = req.session.user;
  var post = {
    markdown: req.body.markdown,
    post: req.body.post,
    subject: req.body.subject
  }
  Post.update(currentUser.name, req.params.day, req.params.title,
    post,
    function(err) {
      var url = encodeURI("/blog/" + req.params.name + "/" + req.params.day +
        "/" + req.params.title);

      if (err) {
        return res.send({
          error: err
        })
      }
      return res.send({
        success: "更新成功",
        location: url
      })
    })
}

exports.remove = function(req, res) {
  var currentUser = req.session.user;

}
