var injector = {
  dependencies: {},
  register: function(key, value) {
    this.dependencies[key] = value;
  },
  resolve: function() {
    var func = arguments[0];
    var scope = arguments[1];
    var deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[
      1].replace(/ /g, "").split(",");
    var args = [];
    return function() {
      var a = Array.prototype.slice.call(arguments);
      for (var i = 0, item; item = deps[i++];) {
        args.push((this.dependencies[item] && item != "") ? this.dependencies[
          item] : a.shift());
      }
      func.apply(scope || {}, args);
    }.bind(this)
  }
};

var a = function() {
  console.log("a");
}
var b = function() {
  console.log("b");
}
var f = function() {
  console.log("f")
}
injector.register("a", a);
injector.register("b", b);
injector.register("f", f);

var c = injector.resolve(function(c, a, b, d, f) {
  a();
  b();
  console.log(c);
  console.log(d);
  f();
})



c("ss", "ff");
