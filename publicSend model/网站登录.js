// 利用订阅发布者模式将登陆之后的各个模块分布开来
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

var login = {};
event.installEvent(login);

setTimeout(function() {
  login.trigger("success", {
    header: "header",
    footer: "footer",
    address: "address"
  })
}, 3000);

header = (function() {
  login.listen("success", function(data) {
    header.setHeader(data.header);
  })
  return {
    setHeader: function(data) {
      console.log(data);
    }
  }
})()
footer = (function() {
  login.listen("success", function(data) {
    footer.setFooter(data.footer);
  })
  return {
    setFooter: function(data) {
      console.log(data);
    }
  }
})()
address = (function() {
  login.listen("success", function(data) {
    address.setAddress(data.address);
  })
  return {
    setAddress: function(data) {
      console.log(data);
    }
  }
})()
