var express = require('express');
var router = express.Router();
var checkLogin = require("../middlePlugin/checkLogin.js");
var uncheckLogin = require("../middlePlugin/uncheckLogin.js");
var blog = require("../controler/blog");
router.get('/post', blog.post);
// router.post('/post', checkLogin);
router.post('/post_blog', blog.post_blog);
module.exports = router;
