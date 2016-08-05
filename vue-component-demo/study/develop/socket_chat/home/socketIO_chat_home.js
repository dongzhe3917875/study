var common = require("./common.js")
$(".delete").on("click", function() {
  var url = get_operate_url("remove");
  var obj = {
    url: url,
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        window.location.href = data.location;
      }
    }
  }
  common.ajax_func.call(null, obj);
})

$(".logout").on("click", function() {
  var obj = {
    url: "/logout",
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        window.location.href = data.location;
      }
    }
  }
  common.ajax_func.call(null, obj);
})
