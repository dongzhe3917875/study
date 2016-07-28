var Post = require('../models/blog.js');
exports.post = function(req, res) {
  res.render("postBlog", {})
}

exports.post_blog = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.post);
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
