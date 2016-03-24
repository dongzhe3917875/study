var ani = function(begin, end, step, callback) {
  var animate = true;
  var click = begin;
  var time = setInterval(function() {
    if (animate) {
      click = click + step;
      if (click <= end) {
        callback(click);
      } else {
        animate = false;
        clearInterval(time);
      }
    }
  }, 16.7);
}
document.querySelector(".next").onclick = function() {
  ani(0, 100, 10, function(click) {
    document.querySelector(".innerSlider").style.left = "-" + click +
      "%";
  })
}
document.querySelector(".prev").onclick = function() {
  ani(-100, 0, 10, function(click) {
    document.querySelector(".innerSlider").style.left = click +
      "%";
  })
}
