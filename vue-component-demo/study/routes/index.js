var express = require('express');
var router = express.Router();
var monk = require('monk');
var user = require("../controler/user")
var db = monk('localhost:27017/nodetest');

router.get('/userlist', user.userlist(db));
router.get('/newuser', user.newuser);
router.post('/adduser', user.adduser(db));
module.exports = router;
