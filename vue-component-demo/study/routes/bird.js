var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Time: ', new Date());
  next();
});

router.get('/', function(req, res) {
  res.send('Birds home page');
});

// 添加路由参数

router.get('/:bird_id', function(req, res) {
  var id = req.params.bird_id;
  res.send("i am a bird, my order is" + id);
})
router.get('/about', function(req, res) {
  res.send('Birds about page');
});
//我们可以在路由配置的回调中，添加多个回调函数。如果有多个回调，我们可以有两种形式，如下，
router.get('/about/:id', function(req, res, next) {
  console.log(req.params.id);
  if (req.params.id == 0) {
    // 上面代码中的 next('route') 表示 跳过 当前路由中间件中剩下的路由回调，执行下一个中间件。
    next('route');
  } else {
    next();
  }
}, function(req, res, next) {
  res.send('regular');
});
// 2.同一个路由配置的多个回调函数在执行时可以被跳过。
router.get('/about/:id', function(req, res, next) {
  console.log("in")
  res.send('special');
});

module.exports = router;
