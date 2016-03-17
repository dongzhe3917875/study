var injector = {
  dependencies: {},
  register: function(key, value) {
    this.dependencies[key] = value;
  },
  resolve: function(deps, func, scope) {
    var args = [];
    for (var i = 0, item; item = deps[i++];) {
      if (this.dependencies[item]) {
        args.push(this.dependencies[item]);
      }
    }
    return function() {
      func.apply(scope || {}, args.concat(Array.prototype.slice.call(
        arguments)))
    }
  }
};

var a = function() {
  console.log("a");
}
var b = function() {
  console.log("b");
}

injector.register("a", a);
injector.register("b", b);

var c = injector.resolve(["a", "b"], function(a, b, c) {
  a();
  b();
  console.log(c);
})

c("c");
