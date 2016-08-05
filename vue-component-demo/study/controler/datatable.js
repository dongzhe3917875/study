exports.demo = function(req, res) {
  res.render("datatable_demo", {})
}
exports.processing = function(req, res) {
  var start = req.query.start;
  var length = req.query.length;
  console.log(start, length)
  return res.send({
    "draw": 3,
    "recordsTotal": "57",
    "recordsFiltered": "57",
    start: start,
    data: [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ]
  })
}
