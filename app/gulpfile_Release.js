var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var sourcemaps = require('gulp-sourcemaps');

var livecenter_js = '/livecenter.js';
var livecenter_min = '/livecenter.min.js';
var livecenter_api_min = '/livecenterapi.js';

var copyDir='D:/srcDriver/dev/LC_Hybrid/src/AgileBet.LiveCenter.WebSite/Public/js';
var destDir='D:/srcDriver/dev/LC_Hybrid/src/AgileBet.LiveCenter.WebSite/bundles';

var bundle_dir = __dirname + '/public/bundle';
var bundle_js = bundle_dir + '/js';

gulp.task('clean', function() {
    return del([bundle_dir + '/*']);
});

gulp.task('copy-js', function() {
    return gulp.src([
             copyDir + '/*'
        ])
        .pipe(gulp.dest(bundle_js));
});

gulp.task('concat-js', function() {
    return gulp.src([
             bundle_js + '/perfect-scrollbar.js',
             bundle_js + '/swfobject.js',
             bundle_js + '/values.js',
             bundle_js + '/global.js',
             bundle_js + '/lcDom.js',
             bundle_js + '/action.js',
             bundle_js + '/animation.js',
             bundle_js + '/base.js',
             bundle_js + '/lc.js',
             bundle_js + '/livecenter.js',
             bundle_js + '/player.js',
             bundle_js + '/divResize.js'
        ])
        .pipe(concat(livecenter_js))//合併後的檔案名稱
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('concat-api-js', function() {
    return gulp.src([
             bundle_js + '/perfect-scrollbar.js',
             bundle_js + '/jquery.min.js',
             bundle_js + '/jquery.mousewheel.js',
             bundle_js + '/swfobject.js',
             bundle_js + '/values.js',
             bundle_js + '/global.js',
             bundle_js + '/lcDom.js',
             bundle_js + '/action.js',
             bundle_js + '/animation.js',
             bundle_js + '/base.js',
             bundle_js + '/lc.js',
             bundle_js + '/livecenter.js',
             bundle_js + '/player.js',
             bundle_js + '/divResize.js'
        ])
        .pipe(concat(livecenter_js))
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('minify-js', function() {
    return gulp.src(bundle_dir + livecenter_js)
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(rename(livecenter_min))
        .pipe(gulp.dest(bundle_dir));
})

gulp.task('minify-api-js', function() {
    return gulp.src(bundle_dir + livecenter_js)
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(rename(livecenter_api_min))
        .pipe(gulp.dest(bundle_dir));
})

gulp.task('finish-task', function() {
    return del(bundle_js);
});

gulp.task('copy-min-file', function() {
    return gulp.src(bundle_dir + livecenter_min)
        .pipe(gulp.dest(destDir));
});

gulp.task('copy-api-min-file', function() {
    return gulp.src(bundle_dir + livecenter_api_min)
        .pipe(gulp.dest(destDir));
});

gulp.task('default', function() {
    runSequence('clean', 'copy-js', 'concat-js','minify-js', 'finish-task', 'copy-min-file');
});

gulp.task('api', function() {
    runSequence('clean', 'copy-js', 'concat-api-js','minify-api-js', 'finish-task', 'copy-api-min-file');
});