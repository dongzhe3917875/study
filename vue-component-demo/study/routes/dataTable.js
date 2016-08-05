var express = require('express');
var router = express.Router();
var datatable = require("../controler/datatable.js");
router.get('/datatable/demo', datatable.demo);
router.get('/datatable/processing', datatable.processing);
module.exports = router;
