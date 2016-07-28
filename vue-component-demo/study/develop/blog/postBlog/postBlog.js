$(document).ready(function() {
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
  var converter = new showdown.Converter();
  $("#context").on("keyup", function() {
    var text = $(this).val();
    html = converter.makeHtml(text);
    $(".showhtml").html(html);
  })

  $(".post").on("click", function(event) {
    event.preventDefault();
    ajax_func({
      url: "/blog/post_blog",
      data: {
        title: $("#title").val(),
        post: $("#context").val()
      },
      success: function(data) {
        if (data.error) {
          return alert(data.error);
        }
        alert(data.success);
        location.href = data.location;
      }
    })
  })
});
