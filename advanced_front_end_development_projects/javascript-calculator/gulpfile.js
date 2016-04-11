var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;
var jade = require('gulp-jade');
var del = require('del');
var inject = require('gulp-inject-string');
var sass = require('gulp-sass');

var jadePath = 'lib/index.jade';
var sassPath = 'lib/main.scss';
var jsPath = 'lib/main.js';

var connectOptions = {
  root: '_dist',
  host: 'localhost',
  port: '3000'
};

var beforeHtml = '<!DOCTYPE html><html ><head><meta charset="UTF-8"><title>JavaScript Calculator</title><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="//codepen.io/assets/reset/normalize.css"><link rel="stylesheet" href="main.css"></head><body>';
var afterHtml = '<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js"></script><script src="main.js"></script></body></html>';

gulp.task('clean', function() {
  del('./_dist').then(console.log('*** del: _dist folder removed'));
});

gulp.task('jade', function() {
  // del('./_dist/index.jade');
  gulp.src(jadePath)
    .pipe(jade())
    .pipe(inject.prepend(beforeHtml))
    .pipe(inject.append(afterHtml))
    .pipe(gulp.dest('./_dist/'));

  console.log('*** index.jade compiled');
});

gulp.task('sass', function() {
  // del('./_dist/main.css');
  gulp.src(sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./_dist/'))
    .pipe(browserSync.stream());

  console.log('*** main.scss compiled');
});

gulp.task('js', function() {
  // del('./_dist/main.js');
  gulp.src(jsPath)
    .pipe(gulp.dest('./_dist/'));

  console.log('*** main.js compiled');
});

gulp.task('build', ['jade', 'sass', 'js']);

gulp.task('watch', function() {
  gulp.watch(jadePath, ['jade']);
  gulp.watch(sassPath, ['sass']);
  gulp.watch(jsPath, ['js']);
  console.log('*** watching files for change...');
});

gulp.task('serve-dev', ['build','watch'], function() {
  browserSync.init({
    server: {
      baseDir: './_dist/'
    }
  });

  gulp.watch('./_dist/index.html', browserSync.reload);
  gulp.watch('./_dist/main.js', browserSync.reload);
});

gulp.task('serve', ['build'], function() {
  connect.server(connectOptions);
});

gulp.task('test', ['serve'], function() {
  gulp.src('./lib/calculator_spec.js')
    .pipe(protractor({
        configFile: './protractor.conf.js',
        args: ['--params.url', 'http://' + connectOptions.host + ':' + connectOptions.port]
      }))
    .on('error', function(e) { throw e; })
    .on('end', function() {
      connect.serverClose();
    });
});

gulp.task('default', ['serve-dev']);
