exports.chat = function(req, res) {
  res.render("socket_chat", {});
}
exports.iochat = function(req, res) {
  res.render("socketIO_chat", {});
}
exports.iochat_login = function(req, res) {
  res.render("socketIO_chat_login", {});
}
