var gulp = require("gulp");
var less = require("gulp-less");
var flatten = require("gulp-flatten");
gulp.task("less", function() {
  return gulp.src("develop/**/*.less")
    .pipe(less())
    .pipe(flatten())
    .pipe(gulp.dest("public/stylesheets"))
})
gulp.task("js", function() {
  return gulp.src("develop/**/*.js")
    .pipe(flatten())
    .pipe(gulp.dest("public/javascripts"))
})
gulp.task("jade", function() {
  return gulp.src("develop/**/*.jade")
    .pipe(flatten())
    .pipe(gulp.dest("views"))
})
gulp.task("start", function() {
  gulp.watch("develop/**/*.less", ['less']);
  gulp.watch("develop/**/*.js", ['js']);
  gulp.watch("develop/**/*.jade", ['jade']);
})

gulp.task("default", ['less', 'js', 'jade'], function() {
  gulp.start('start');
})
