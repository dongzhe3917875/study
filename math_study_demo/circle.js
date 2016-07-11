function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}
// 求两点之间的距离
function point_dis(x1, y1, x2, y2) {
  return {
    dispow2: Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2),
    dis: Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }
}
// 判断浮点数是不是相等
function floatEqual(a, b) {
  return (Math.abs(a - b) <= 1e-9);
}
Circle.prototype.findCommonPoint = function(circle) {
  var x2 = circle.x;
  var y2 = circle.y;
  var r2 = circle.r;
  var x1 = this.x;
  var y1 = this.y;
  var r1 = this.r;

  // 存放求解的三家函数值
  var cos_value = [];
  var sin_value = [];

  // 存放求解的数值
  var point = [];

  // 判断是否有交点
  var dis = point_dis(x1, y1, x2, y2).dis
  var dispow2 = point_dis(x1, y1, x2, y2).dispow2;
  // 无交点
  if (dis > (r1 + r2) || dis < (Math.abs(r1 - r2))) {
    return false;
  }

  var a = 2 * r1 * (x1 - x2);
  var b = 2 * r1 * (y1 - y2);
  var c = r2 * r2 - r1 * r1 - dispow2;

  var p = a * a + b * b
  var q = -2 * a * c;
  var r = c * c - b * b;
  console.log(a, b, c, q, p, r);
  // 判断是否相切 只有一个交点
  if (floatEqual(dis, r1 + r2) || floatEqual(dis, Math.abs(r1 - r2))) {
    cos_value[0] = -q / (2 * p);
    sin_value[0] = Math.sqrt(1 - cos_value[0] * cos_value[0]);
    point[0] = {};
    point[0].x = x1 + cos_value[0] * r1;
    point[0].y = y1 + sin_value[0] * r1;

    // 验证点的正确性
    if (!floatEqual(point_dis(x1, point[0].x, y1, point[0].y).dispow2, r1 *
        r1)) {
      point[0].y = y1 - sin_value[0] * r1;
    }

  } else {
    // 有两个交点 使用求根公式
    point[0] = {};
    point[1] = {};
    cos_value[0] = (Math.sqrt(q * q - 4.0 * p * r) - q) / p / 2.0;
    cos_value[1] = (-Math.sqrt(q * q - 4.0 * p * r) - q) / p / 2.0;
    sin_value[0] = Math.sqrt(1 - cos_value[0] * cos_value[0]);
    sin_value[1] = Math.sqrt(1 - cos_value[1] * cos_value[1]);
    point[0].x = x1 + cos_value[0] * r1;
    point[0].y = y1 + sin_value[0] * r1;

    point[1].x = x1 + cos_value[1] * r1;
    point[1].y = y1 + sin_value[1] * r1;

    if (!floatEqual(point_dis(x1, point[0].x, y1, point[0].y).dispow2, r1 *
        r1)) {
      point[0].y = y1 - sin_value[0] * r1;
    }
    if (!floatEqual(point_dis(x1, point[1].x, y1, point[1].y).dispow2, r1 *
        r1)) {
      point[1].y = y1 - sin_value[1] * r1;
    }
    console.log(point[0].y, point[1].y)
    if (floatEqual(point[0].x, point[1].x) || floatEqual(point[0].y, point[1]
        .y)) {
      console.log(point[0].y, point[1].y)
      if (point[0].y > 0) {
        point[1].y = -point[1].y;
      } else {
        point[0].y = -point[0].y;
      }
    }
  }

  return point;
}
var circle1 = new Circle(0, 0, 6)
circle1.findCommonPoint(new Circle(10, 0, 6));
