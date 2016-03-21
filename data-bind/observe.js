var user = {};
Object.observe(user, function(changes) {
  console.log(JSON.stringify(changes))
  changes.forEach(function(change) {
    console.log(change.name);
    console.log(change.type);
    console.log(change.object.firstname)
  });
});
user.firstname = '董哲123456';
user.lastname = 'sdsdsd';



var input1 = document.getElementById("input1");
var input1user = {};
Object.observe(input1user, function(changes) {
  var res = "";
  changes.forEach(function(change) {
    res = res + change.type + ":" + change.object[change.name] + ",";
  })
  input1.value = res;
})
input1user.firstname = '董哲123456';
input1user.lastname = 'sdsdsd';
input1.onchange = function() {
  var val = this.value;
  if (val.split(",").length) {
    val.split(",").forEach(function(ele) {
      if (ele.split(":").length) {
        input1user[ele.split(":")[0]] = ele.split(":")[1];
      }
    })
  }
}



var input2user = {};
var input2 = document.getElementById("input2");
var bindModelView = function(element, obj, property) {
  Object.observe(obj, function(changes) {
    var res = "";
    changes.forEach(function(change) {
      if (property.toString().indexOf(change.name) != -1) {
        res = res + change.type + "  " + change.name + ":" + change.object[
            change.name] +
          ",";
      }
    })
    element.value = res;
  });
  element.onchange = function() {
    var val = this.value;
    if (val.split(",").length) {
      val.split(",").forEach(function(ele) {
        if ((ele.split(":").length && ele.split(":")[1]) || (Object.prototype
            .toString.call(
              property) === "[object Array]" && property.toString().indexOf(
              ele.split(":")[0]) != -1)) {
          obj[ele.split(":")[0]] = ele.split(":")[1];
        }
      })
    }
  }
}
bindModelView(input2, input2user, ["firstname"]);
input2user.firstname = '董哲123456';
input2user.lastname = 'sdsdsd';
