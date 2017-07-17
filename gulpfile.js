var gulp = require('gulp'),
   
 compass          = require('gulp-compass'),
 autoprefixer     = require('gulp-autoprefixer'),
 minifycss        = require('gulp-minify-css'),
  //uglify           = require('gulp-uglify'),
 rename           = require('gulp-rename'),


//var sass        = require('gulp-ruby-sass');

    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
   // del = require('del');

//styles
gulp.task('sass', function() {
  return gulp.src(['src/sass/style.scss'])
    //.pipe(plumber(plumberErrorHandler))
    .pipe(compass({
      css: 'dist/css',
      sass: 'src/sass',
      //image: 'html/images'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //.pipe(gulp.dest('src/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/error'));
    
});



// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
});

// Clean
//gulp.task('clean', function() {
//  return del(['dist/css', 'dist/scripts', 'dist/images']);
//});

// Default task
gulp.task('default', function() {
  gulp.start('sass',"scripts","images");
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/sass/*.scss', ['sass']);

  // Watch .js files
  gulp.watch('src/scripts/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});