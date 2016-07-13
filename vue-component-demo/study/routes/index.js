var express = require('express');
var router = express.Router();
var monk = require('monk');
var user = require("../controler/user");
var demo = require("../controler/demo");
var db = monk('localhost:27017/nodetest');
var checkLogin = require("../middlePlugin/checkLogin.js");
var uncheckLogin = require("../middlePlugin/uncheckLogin.js");
router.get('/userlist', user.userlist(db));
router.get('/newuser', user.newuser);
router.post('/adduser', user.adduser(db));
router.get('/socket_chat', demo.chat);

router.get('/socketIO_chat', checkLogin);
router.get('/socketIO_chat', demo.iochat);


router.get('/socketIO_chat/login', uncheckLogin);
router.get('/socketIO_chat/login', demo.iochat_login);

router.get('/socketIO_chat/register', uncheckLogin);
router.get('/socketIO_chat/register', demo.iochat_register);


router.get('/socketIO_chat/home', checkLogin);
router.get('/socketIO_chat/home', demo.home);

router.post("/reg", demo.register);
router.post("/login", demo.login);
router.post("/logout", demo.logout);
module.exports = router;
