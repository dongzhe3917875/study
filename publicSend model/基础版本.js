var salesOffice = {};
salesOffice.clientList = {};
salesOffice.listen = function(key, fn) {
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
}

salesOffice.trigger = function() {
  var key = Array.prototype.shift.call(arguments);
  var fns = this.clientList[key];
  if (!fns || fns.length == 0) {
    return false;
  }
  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);
  }
}

salesOffice.listen("88", function(price) {
  console.log("88 price: " + price)
})

salesOffice.listen("100", function(price) {
  console.log("100 price: " + price)
})

salesOffice.trigger("88", 8800);
salesOffice.trigger("100", 10000);
