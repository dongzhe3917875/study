var express = require('express');
var router = express.Router();
var operate_svg = require("../controler/operate_svg.js");
router.get('/operate_svg', operate_svg.render);
module.exports = router;
