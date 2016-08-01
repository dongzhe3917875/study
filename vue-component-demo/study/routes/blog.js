var express = require('express');
var router = express.Router();
var checkLogin = require("../middlePlugin/checkLogin.js");
var uncheckLogin = require("../middlePlugin/uncheckLogin.js");
var blog = require("../controler/blog");
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
})
router.get('/post', blog.post);
// router.post('/post', checkLogin);
router.post('/post_blog', blog.post_blog);
router.post('/upload', upload.single("file"), blog.upload);
router.get('/:name', checkLogin);
router.get('/:name', blog.list);
router.get('/:name/:day/:title', checkLogin);
router.get('/:name/:day/:title', blog.listone);

module.exports = router;
