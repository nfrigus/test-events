const
  babel = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  connect = require('gulp-connect'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

var conf = {
  distDir: 'dist',
  distFile: 'app.min.js',
  entryPoint: './src/index.js',
  watchPaths: 'src/**/*.js'
};

function compileJs() {
  browserify(conf.entryPoint, {
      debug: true
    })
    .transform(babel, {
      presets: ["es2015"],
      sourceMaps: true
    })
    .bundle().on('error', function(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source(conf.distFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(conf.distDir));
}

function serve() {
  compileJs();

  connect.server({
    livereload: true,
    port: 3000,
    root: 'dist',
  });
};

gulp.task('serve', () => serve());
gulp.task('build', () => compileJs());
gulp.task('watch', () => gulp.watch(conf.watchPaths, ['build']));

gulp.task('default', ['build']);
