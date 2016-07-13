module.exports = function(req, res, next) {
  if (req.session.user) {
    res.redirect('/socketIO_chat/home')
      // res.redirect('/socketIO_chat')
  }
  next();
}
