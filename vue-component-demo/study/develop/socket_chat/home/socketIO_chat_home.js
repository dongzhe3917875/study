var ajax_func = function(obj) {
  var defaultOption = {
    url: "",
    type: "POST",
    dataType: "json",
    data: {},
    success: function(data) {

    }
  }
  var obj = $.extend(true, {},
    defaultOption, obj);
  $.ajax(obj);
}
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
  ajax_func.call(null, obj);
})
