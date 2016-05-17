exports.test = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    name: "dongzhe",
    age: 22
  });
}
