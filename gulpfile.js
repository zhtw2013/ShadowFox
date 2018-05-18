'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');


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
