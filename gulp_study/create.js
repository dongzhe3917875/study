var fs = require("fs");

function createDirAndFile(dir, callback) {
  fs.exists(dir, function(exists) {
    if (!exists) {
      fs.mkdir(dir, function(err) {
        if (err) {
          console.log(err);
        } else {
          callback.call(null, dir);
        }
      });
    } else {
      callback.call(null, dir);
      // fs.writeFile("header/header.html", "");
    }
  });
}
// var headerdir = "header";
// var footerdir = "footer"
// createDirAndFile(headerdir, function(dir) {
//   fs.writeFile(dir + "/header.html", "");
// });
// createDirAndFile(footerdir, function(dir) {
//   fs.writeFile(dir + "/footer.html", "");
// });

var dirs = [{
  chapter1: ["page1", "page2", "page3"]
}, {
  chapter2: ["page1", "page2", "page3", "page4", "page5"]
}, {
  chapter3: ["page1"]
}]
fs.writeFile("page.json", JSON.stringify(dirs));
dirs.forEach(function(ele) {
  var dir = Object.keys(ele)[0];
  var array = ele[dir];
  (function(dir, array) {
    createDirAndFile(dir, function(dir) {
      array.forEach(function(page) {
        fs.exists(dir + "/" + page + ".{html，md}", function(exist) {
          // console.log(exist);
          if (!exist) {
            fs.writeFile(dir + "/" + page + ".html", "");
            fs.writeFile(dir + "/" + page + "_md.md", "");
          }
        })
      })
    })
  })(dir, array)
});
module.exports = {
  dir: dirs
}
