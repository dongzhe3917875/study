// 在上一个的基础上
// 将event整合出来 可以动态的给任何对象添加订阅发布功能
// 添加取消订阅的功能

var event = {
  eventList: {},
  listen: function(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = [];
    }
    this.eventList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments);
    var fns = this.eventList[key];
    if (!fns || fns.length == 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  },
  remove: function(key, fn) {
    var fns = this.eventList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    }
    for (var j = 0; j < fns.length; j++) {
      var _fn = fns[j];
      if (_fn == fn) {
        fns.splice(j, 1);
      }
    }
  },
  installEvent: function(obj) {
    for (var item in this) {
      if (item !== 'installEvent') {
        obj[item] = this[item]
      }
    }
  }
}


var salesOffice = {};
event.installEvent(salesOffice);

var fn1 = function(hehe) {
  console.log(hehe);
}
var fn2 = function(hehe) {
  console.log(hehe + "heheheh");
}
var fn3 = function(hehe) {
  console.log(hehe + "hahahahah");
}
salesOffice.listen("click", fn1);
salesOffice.listen("click", fn2);
salesOffice.listen("click", fn3);
salesOffice.trigger("click", "123456");

salesOffice.remove("click", fn1);

salesOffice.trigger("click", "123456");

salesOffice.remove("click");

salesOffice.trigger("click", "123456");
