$(document).ready(function() {
  var sendul = $(".sendmaillist");
  var copyurl = $('.copymaillist');
  $(".send").on("click", function() {
    var list = [];
    var copylist = [];
    sendul.find(":checked").siblings("label").each(function(index,
      check) {
      list.push($(check).data("href").split(":")[1])
    })
    copyurl.find(":checked").siblings("label").each(function(index,
      check) {
      copylist.push($(check).data("href").split(":")[1])
    })
    location.href = ("mailto:" + list.join(";") + "?cc=" + copylist.join(
      ";"));
  });

  function bindcheckbox(bind1, bind2) {
    bind1.find(":checkbox").on("change", function() {
      var url = $(this).siblings("label").attr("data-href");
      var obj = bind2.find("[data-href='" + url + "']").parent();
      if ($(this).prop("checked") == true) {
        obj.hide();
      } else {
        obj.show();
      }
    })
  }
  bindcheckbox(sendul, copyurl);
  bindcheckbox(copyurl, sendul);
});
