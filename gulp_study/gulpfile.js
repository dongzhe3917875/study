// var dirs = require("./create");
var fs = require("fs");
var dirs = JSON.parse(fs.readFileSync("./page.json", 'utf-8'));
var handlebars = require('gulp-handlebars');
var handlebars_compile = require('gulp-compile-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var gulp = require("gulp");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var markdown = require('gulp-markdown');
var through = require("through-gulp")
gulp.task('concathtml', ['template', 'contactmd'], function() {
  gulp.src(['header/header.html', 'sidebar/*.html', 'markdown/**/*$.html',
      'footer/footer.html'
    ])
    .pipe(concat('main.html'))
    .pipe(gulp.dest('build'))
});
gulp.task('concat', function() {
  gulp.src(['header/header.html', 'footer/footer.html'])
    .pipe(concat('bbb.html'))
    .pipe(gulp.dest('build'))
});

function processPath(path) {
  return path.replace(/markdown\\/, "").replace(/_md/, "");
}


function sample() {
  // creating a stream through which each file will pass
  var stream = through(function(file, encoding, callback) {
    // do whatever necessary to process the file
    if (file.isNull()) {

    }
    if (file.isBuffer()) {

    }
    if (file.isStream()) {

    }
    // just pipe data next, or just do nothing to process file later in flushFunction
    // never forget callback to indicate that the file has been processed.
    var matchPath = processPath(file.path);
    var finalPath = file.path.replace(/_md/, "$");
    // console.log(matchPath, finalPath);
    fs.writeFileSync(finalPath, fs.readFileSync(
      matchPath, "utf-8") + fs.readFileSync(file.path, "utf-8"))
    this.push(file);
    // console.log(this);
    callback();
  }, function(callback) {
    // just pipe data next, just callback to indicate that the stream's over
    this.push();
    callback();
  });
  return stream;
};
gulp.task("contactmd", function() {
  var matchPath = "";
  var path = ""
  return gulp.src('./chapter*/*.md')
    // .pipe(markdown())
    .pipe(markdown())
    .pipe(gulp.dest("markdown"))
    .pipe(sample())

  // .pipe(through(function(file, encoding, callback) {
  //   path = file.path;
  //   matchPath = processPath(file.path);
  //   // console.log(file.path, matchPath)
  //   fs.writeFileSync(matchPath, file);
  // }))
  // .pipe(concat(path));
})
gulp.task('templates', function() {
  gulp.src('source/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
});


gulp.task('template', function() {
  var templateData = {
    dir: dirs
  };
  console.log(dirs);
  return gulp.src('source/templates/*.hbs')
    .pipe(handlebars_compile(templateData))
    .pipe(rename('sidebar.html'))
    .pipe(gulp.dest('sidebar'));
});
// gulp.task("watch", function() {
//   var watcher = gulp.watch("./chapter*/*.{html,md}", ['template']);
//   watcher.on("change", function(event) {
//     var type = event.type;
//     var path = event.path;
//     var pathArray = path.split("\\").slice(-2);
//   });
//
// })
