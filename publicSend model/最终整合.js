/*支持离线事件
// 可以先发布 缓存到临时列表中 等到订阅的时候 首先检测有没有待发布的 有 发布
*/
/* 支持命名空间 */
var Event = (function() {
  var _default = 'default';
  var Event = (function() {
    var nameSpace = {};
    var equal;
    var _unshift = Array.prototype.unshift;
    var _shift = Array.prototype.shift;
    var each = function(ary, fn) {
      for (var i = 0; i < ary.length; i++) {
        fn.call(ary[i], i, ary[i])
      }
    }

    var _listen = function(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn)
    }

    // 支持一个或者全部的解绑定
    var _remove = function(key, cache, fn) {
      var fns = cache[key];
      if (!fns) {
        return;
      }
      if (!fn) {
        fns && (fns.length = 0);
      }
      for (var i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1);
        }
      }
    }

    // 增加了参数 就是存储函数的对象 这个对象是动态加入的
    var _trigger = function() {
      var cache = _shift.call(arguments);
      var key = _shift.call(arguments);
      var args = arguments;
      var fns = cache[key];
      var _self = this;
      if (!fns || !fns.length) {
        return;
      }
      return each(fns, function(index, value) {
        return value.apply(_self, args);
      })
    }

    // 最重要的函数 返回的对象是基于命名空间的 当命名空间不变得时候 返回的对象也是不变的 所以相应的cache 和 offlineList 是存在同一个
    // 闭包内的 （同一个执行环境 因为ret并没有新生成） 所以var cache = {}; var offlineList = [];不会影响 同一个命名空间返回的event是
    // 同一个 所以cache offlineList 不会被更新

    var _create = function(namespace) {
      var namespace = namespace || _default;
      var cache = {};
      var offlineList = [];
      var ret = {
        // listen 首先检测离线事件 如果先前有过trigger offlineList会有缓存的函数 则执行离线事件
        // 如果没有trigger 则绑定事件 并将离线置为null
        listen: function(key, fn, last) {
          _listen(key, fn, cache);
          if (offlineList == null) {
            return;
          }
          if (last == 'last') {
            offlineList.length && offlineList.pop()();
          } else {
            each(offlineList, function(index, value) {
              value();
            })
          }
          offlineList = null;
        },
        one: function(key, fn, last) {
          _remove(key, cache);
          this.listen(key, fn, last);
        },

        remove: function(key, fn) {
          _remove(key, cache, fn);
        },

        trigger: function() {
          _unshift.call(arguments, cache);
          var args = arguments;
          var _self = this;
          var fn = function() {
              _trigger.apply(_self, args);
            }
            // 如果listen过 则肯定离线为空
            // 如果没有listen过 有离线 则将执行缓存起来 等到有listen时执行
          if (offlineList) {
            return offlineList.push(fn);
          }
          return fn();
        }
      };
      return namespace ?
        (nameSpace[namespace] ? nameSpace[namespace] :
          nameSpace[namespace] = ret) : ret;
    }

    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function(key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function(key, fn, last) {
        var event = this.create();
        console.log(equal === event)
        event.listen(key, fn, last);
      },
      trigger: function() {
        var event = this.create();
        console.log(equal = event)
        event.trigger.apply(this, arguments);
      }
    }
  })();
  return Event;
})()
Event.trigger("click", 1);
Event.listen('click', function(e) {
  console.log(e);
})

Event.create('namespace1').listen('click', function(e) {
  console.log(e)
})

Event.create('namespace1').trigger('click', 14)


Event.create('namespace10').listen('click', function(e) {
  console.log(e)
})

Event.create('namespace10').trigger('click', 140)


// 1 同一个命名空间返回的event相同 cache 和 offlineList不会被覆盖
// 2 不同命名空间会改变 event
// 3 离线的设置支持了可以先trigger 再 listen的行为
