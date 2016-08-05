$(document).ready(function() {
  var common = require("common.js")
  $('#example').dataTable({
    "processing": true,
    "serverSide": true,
    "ajax": function(data1, callback, settings) {
      console.log(data1);
      common.ajax_func({
        url: "/datatable/processing",
        type: "GET",
        data: data1,
        success: function(data) {
          callback(data)
        }
      })
    }
  })
})
