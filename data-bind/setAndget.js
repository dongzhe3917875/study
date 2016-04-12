var user2 = {};
var nameValue = 'Joe';
Object.defineProperty(user2, 'name', {
  get: function() {
    return nameValue
  },
  set: function(newValue) {
    nameValue = newValue;
  },
  configurable: true // 允许在稍后重定义这个属性
});

user2.name //Joe
user2.name = 'Bob'
user2.name //Bob
console.log(nameValue) //Bob

// 多个dom绑定一个对象

var input3 = document.getElementById("input3");
var input4 = document.getElementById("input4");
var domobj = {};
var dataTwoBind = function(obj, property, callback) {
  var array = [];
  return function() {
    var element = arguments[0];
    array.push(element);
    element.onchange = function() {
      obj[property] = this.value;
    }
    Object.defineProperty(obj, property, {
      get: function() {
        return element.value;
      },
      set: function(value) {
        array.forEach(function(element) {
          callback.call(obj, value, element);
        })
      },
      configurable: true
    })
  }
}

var bind = dataTwoBind(domobj, "name", function(value, element) {
  console.log(value, this);
  element.value = value;
});
bind(input3);
bind(input4);
domobj.name = "dongzhe";
domobj.age = 16;
