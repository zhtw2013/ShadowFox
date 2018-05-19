'use strict';

var gulp = require('gulp');
var log = require('fancy-log');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var purify = require('gulp-purifycss');
var critical = require('critical').stream;



/* Add everything to userChrome */
gulp.task('combine', function() {
  return gulp.src(['vendors/css/*.css'])
    .pipe(concatCss('combined.css'))
    .pipe(gulp.dest('vendors/css/'));
});

gulp.task('minify-css', () => {
  return gulp.src(['vendors/css/combined.css'])
    .pipe(cleanCSS({
      level : 2
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('base.html')
        .pipe(critical({
          base: 'test/',
          inline: true,
          css: ['resources/css/style.css','resources/css/queries.css', 'vendors/css/combined.css']
        }))
        .on('error', function(err) { log.error(err.message); })
        .pipe(rename("index.html"))
        .pipe(gulp.dest('.'));
});

gulp.task('purify', function() {
  return gulp.src('vendors/css/combined.css')
    .pipe(purify(['vendors/js/*.js', 'resources/js/*.js', 'basic.js']))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});


gulp.task('publish', gulp.series('combine', 'minify-css', 'critical'));
