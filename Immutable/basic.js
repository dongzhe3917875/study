"use strict"
// Immutable 总会返回新的对象
var obj = {
  a: 1,
  b: 2
};
// fromJS是讲一个普通的js对象深拷贝为Immutable对象
var map1 = Immutable.fromJS(obj);

// 每次改变都生成新的对象
var map2 = map1.set('a', 3);

console.log(map1 === map2); // false

// 没有改变就会返回自己 指向的是同一对象
var map2 = map1.set('a', 1);

console.log(map1 === map2); // true

// Immutable 数据共享 每次改变的值只会沿着祖父的路线进行重写 其他不变的部分各个Immutable对象都会共享

var obj2 = {
  age: 27,
  list: [1, 2, 3]
}

var map1 = Immutable.fromJS(obj2);
var map2 = map1.set('age', 26);
console.log(map1 === map2); // false

// list部分并未修改 所以可以共享
console.log(map1.list === map2.list); // true

// Seq的结构 数据不变 延迟执行
// 等到真正计算的时候再去执行 而不会暂存所有结果
var result = Immutable.Range(1, Infinity)
  .map(n => -n)
  .take(5)
  .reduce((r, n) => r + n, 0);

// setIn getIn updateIn 可以进行深度的操作

var obj3 = {
  a: {
    b: {
      c: {
        list: [1, 2]
      }
    }
  }
}

var map = Immutable.fromJS(obj3);
var map1 = map.updateIn(['a', 'b', 'c', 'list'], (list => {
  return list.push(3, 4, 5);
}))

console.log(map1.getIn(['a', 'b', 'c', 'list'])) // List [1, 2, 3, 4, 5]

// Immutable降低可变数据带来的副应用
function touchFn(data) {
  data.set('key', "valueanother");
}

function touchAndLog(touchFn) {
  var data = {
    key: 'value'
  };
  touchFn(data);
  console.log(data.key); // 猜猜会打印什么？
}

function touchAndLog(touchFn) {
  var data = {
    key: 'value'
  };
  data = Immutable.fromJS(data);
  touchFn(data);
  console.log(data.get('key')); // 猜猜会打印什么？
}
touchAndLog(touchFn);


// 比较两个对象是否一致 使用 === 比较的是引用的地址
// 比较两个对象的值是否一致 使用的是Immutable.is方法

let map3 = Immutable.Map({
  a: 1,
  b: 1,
  c: 1
});
let map4 = Immutable.Map({
  a: 1,
  b: 1,
  c: 1
});
console.log(map3 === map4); // false
console.log(Immutable.is(map3, map4)); // true


// 与 Object.freeze、const 区别

// Object.freeze 和 ES6 中新加入的 const 都可以达到防止对象被篡改的功能，但它们是 shallowCopy 的。对象层级一深就要特殊处理了。/

// Cursor 的概念
