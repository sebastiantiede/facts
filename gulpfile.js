var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var modRewrite  = require('connect-modrewrite');
var nunjucksRender = require('gulp-nunjucks-render');
var php = require('gulp-connect-php');
var sassvg = require('gulp-sassvg');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var dist = './' + (gutil.env.type === 'production' ? 'docs' : 'dist'),
    src = './src',
    styles = '/styles',
    scripts = '/scripts',
    bower_components = './bower_components',
    libs = './libs'
;

var dependencies = {
    js: [
        bower_components + '/jQuery/dist/jquery.min.js',
        bower_components + '/underscore/underscore.js',
        bower_components + '/slick-carousel/slick/slick.min.js',
        bower_components + '/gh3/gh3.js',
        bower_components + '/rrssb/js/rrssb.min.js'
    ],
    css: [
        bower_components + '/slick-carousel/slick/slick.css',
        bower_components + '/rrssb/css/rrssb.css'
    ]
};


gulp.task('sass', function () {
    console.log(dist+styles,src+styles);
	return sass(src+styles+'/app.scss', {sourcemap: true, style: (gutil.env.type === 'production' ? 'compressed' : 'nested')})
    .on('error', sass.logError)
	.pipe(sourcemaps.write())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
	//.pipe(concat('app.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(dist+styles))
	.pipe(browserSync.stream());
});

gulp.task('sassvg', function(){
    return gulp.src(src+'/images/svg/**/*.svg')
        .pipe(sassvg({
          outputFolder: src+'/images/sassvg/', // IMPORTANT: this folder needs to exist
            optimizeSvg: true // true (default) means about 25% reduction of generated file size, but 3x time for generating the _icons.scss file
        }));
});

gulp.task('js', function() {
  return gulp.src(src+scripts+'/**/*.js', { sourcemap: true})
    .pipe(sourcemaps.init())
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist+scripts))
	.pipe(browserSync.stream());
});

gulp.task("js-dependencies-bundle", function () {
    return gulp.src(dependencies.js)
     .pipe(concat("dependencies-bundle.js"))
     .pipe(gulp.dest(dist+scripts+''));
});

gulp.task("css-dependencies-bundle", function () {
    return gulp.src(dependencies.css)
     .pipe(concat("dependencies-bundle.css"))
     .pipe(gulp.dest(dist+styles+''));
});

gulp.task("html", function () {
    return gulp.src(src+'/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: [src+'/templates']
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task("html-min", ["html"], function () {
    console.log(dist+'/**/*.html');
    return gulp.src(dist+'/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});


gulp.task('watch', function() {
	browserSync.init({
        server: {
            baseDir: dist
        },
        notify: false,
        files: dist+styles+'/app.css',
    });


    gulp.watch(src+styles+'/**/*.scss', ['sass'])
        .on('change', function(event){
            console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
        });

    gulp.watch(src+scripts+'/**/*.js', ['js'])
        .on('change', function(event){
            console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
        });


    /*
    gulp.watch('./*.html')
        .on('change', browserSync.reload);*/

    gulp.watch(src+'/**/*.+(html|nunjucks)', ['html'])
        .on('change', function(event){
            console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
        });
});

/* usage: gulp */

gulp.task('default', ['html', 'sass', 'js', 'js-dependencies-bundle', 'css-dependencies-bundle', 'watch']);

/* usage: gulp build --type=production */
gulp.task('build', ['html', 'html-min', 'sass', 'js', 'js-dependencies-bundle', 'css-dependencies-bundle']);
