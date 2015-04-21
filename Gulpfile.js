var gulp = require('gulp');

var uglify = require('gulp-uglify');
var uglifyjs = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var build = function build() {

  return gulp.src([
    './lib/jschannel.js',
    './lib/lodash.custom.min.js',
    './lib/q.min.js',
    './src/mllvp.js',
    './src/mllvp-youtube.js'
    ], {base: '.'})
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('mllvp.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));

};

gulp.task('default', build);

gulp.task('watch', function () {

  gulp.watch([
    './src/mllvp.js',
    './src/mllvp-youtube.js'
    ], build);

});