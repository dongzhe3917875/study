var bar = (function() {
  function getClientDistance(dom) {
    var left = 0;
    var top = 0;
    while (dom.offsetParent) {
      left = left + dom.offsetLeft;
      top = top + dom.offsetTop;
      dom = dom.offsetParent;
    }
    return {
      left: left,
      top: top
    }
  }

  var animate = function(begin, end, duration, teen, fn) {
    var begin_time = new Date;
    var timeID = null;
    var currentDistance = 0;
    timeID = setInterval(function() {
      if (new Date - begin_time >= duration) {
        currentDistance = end;
        clearInterval(timeID);
        timeID = null;
      } else {
        currentDistance = teen.call(null, duration, begin, end, new Date -
          begin_time);
      }
      fn.call(null, currentDistance);
    }, 20)
  }
  return function(obj, update, send) {
    var dom = document.querySelector(obj.dom);
    var animateTime = obj.animateTime;
    var animateStyle = obj.animateStyle;
    var min = obj.min;
    var max = obj.max;
    var step = obj.step;
    var current = obj.current;
    var cursor = dom.querySelector(".cursor");
    var outer = dom.querySelector(".progress_outer");
    var inner = dom.querySelector(".progress_inner");
    var cursorWidth = cursor.offsetWidth;
    var outerWidth = outer.offsetWidth;
    var timer = null;

    function init() {
      var percent = current / (max - min);
      cursor.style.left = outerWidth * percent + "px";
      inner.style.width = outerWidth * percent + 10 + "px";
      update.call(null, current);
    }

    function getCurrent(min, max, currentPercent, step) {
      var currentValue = parseInt(min + currentPercent * (max - min));
      return currentValue - (currentValue % step);
    }
    cursor.onmousedown = function(event) {
      event.stopPropagation()
      var left_diff = event.clientX - getClientDistance(cursor).left;
      var top_diff = event.clientY - getClientDistance(cursor).top;
      var move = function(event) {
        var move_left = event.clientX - getClientDistance(outer).left -
          left_diff;
        if (move_left <= 0) {
          move_left = 0;
        }
        if (move_left >= outerWidth - cursorWidth) {
          move_left = outerWidth;
        }
        cursor.style.left = move_left + "px";
        inner.style.width = move_left + 10 + "px";

        current = getCurrent(min, max, move_left / outerWidth,
          step);
        update.call(null, current);
      }
      document.onmousemove = function(event) {
        if (timer) {
          return false;
        }
        timer = setTimeout(function() {
          move(event);
          clearTimeout(timer);
          timer = null;
        }, 16.7);
        outer.onclick = null;
      }

      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        send.call(null, current);
        setTimeout(function() {
          outer.onclick = outerClick;
        }, 0)
        return false;
      }
      return false;
    }
    var outerClick = function(event) {
      var move_left = event.clientX - getClientDistance(outer).left;
      var final = getCurrent(min, max, move_left / outerWidth,
        step);
      var cursorCurrentLeft = (cursor.style.left == "" ? 0 : parseInt(
        cursor.style
        .left));
      var innerCurrentWidth = (inner.style.width == "" ? 0 : parseInt(
        inner.style
        .width));
      animate(cursorCurrentLeft, move_left, animateTime, animateStyle,
        function(
          currentDistance) {
          cursor.style.left = currentDistance + "px";
        })
      animate(innerCurrentWidth, move_left, animateTime, animateStyle,
        function(
          currentDistance) {
          inner.style.width = currentDistance + 10 + "px";
          current = getCurrent(min, max, currentDistance / outerWidth,
            step);
          update.call(null, current);
        })
      send.call(null, final);
    }
    outer.onclick = outerClick;
    init();
  }
})()
var teen = {
  linear: function(duration, begin, end, current) {
    return begin + (end - begin) * (current / duration);
  }
}


var text = document.getElementById("show");
var bar1 = bar({
  dom: ".combine",
  animateTime: 500,
  animateStyle: teen.linear,
  min: 10,
  max: 1000,
  current: 500,
  step: 10
}, function(current) {
  text.value = current;
  // console.log("update current " + current);
}, function(current) {
  // console.log("send current " + current)
});

function validate(value) {
  return;
}
text.onkeyup = function() {
  var value = this.value;
  validate(value);
  var dom = document.querySelector(".combine")
  var cursor = dom.querySelector(".cursor");
  var outer = dom.querySelector(".progress_outer");
  var inner = dom.querySelector(".progress_inner");
  var percent = (value / (1000 - 10)).toFixed(2) * 100;
  cursor.style.left = percent + "%";
  inner.style.width = outer.offsetWidth * percent / 100 + 10 + "px";
}
