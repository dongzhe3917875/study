var express = require('express');
var router = express.Router();
var test = require("../controler/test");
router.get('/test', test.test);
module.exports = router;
