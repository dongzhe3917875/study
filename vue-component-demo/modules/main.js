require("./demo.less");
console.log(123);
window.setTimeout(function() {
  console.log("ok");
  console.log("watch")
}, 1000)
var sum = (sum1, sum2) => sum1 + sum2;
console.log(sum(2, 3));

var muti = (sum1, sum2) => sum1 * sum2;

console.log(muti(2, 3));
