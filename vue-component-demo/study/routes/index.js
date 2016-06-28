var express = require('express');
var router = express.Router();
var monk = require('monk');
var user = require("../controler/user");
var demo = require("../controler/demo");
var db = monk('localhost:27017/nodetest');

router.get('/userlist', user.userlist(db));
router.get('/newuser', user.newuser);
router.post('/adduser', user.adduser(db));
router.get('/socket_chat', demo.chat);
router.get('/socketIO_chat', demo.iochat);
router.get('/socketIO_chat/login', demo.iochat_login);
module.exports = router;
