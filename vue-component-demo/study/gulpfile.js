var gulp = require("gulp");
var less = require("gulp-less");
var flatten = require("gulp-flatten");
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
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
gulp.task('templates', function() {
  gulp.src('develop/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'dzhappy.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/javascripts/'));
});
// gulp.task("templates", function() {
//   return gulp.src("develop/**/*.hbs")
//     .pipe(handlebars())
//     .pipe(wrap('Handlebars.template(<%= contents %>)'))
//     .pipe(declare({
//       namespace: 'dzhappy.templates',
//       noRedeclare: true // Avoid duplicate declarations
//     }))
//     .pipe(concat("templates.js"))
//     .pipe(gulp.dest("public/javascripts"))
// })
gulp.task("start", function() {
  gulp.watch("develop/**/*.less", ['less']);
  gulp.watch("develop/**/*.js", ['js']);
  gulp.watch("develop/**/*.jade", ['jade']);
  gulp.watch("develop/**/*.hbs", ['templates']);
})

gulp.task("default", ['less', 'js', 'jade', 'templates'], function() {
  gulp.start('start');
})
