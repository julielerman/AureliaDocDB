var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
// var changelog = require('conventional-changelog');
var assign = Object.assign || require('object-assign');
var fs = require('fs');
var bump = require('gulp-bump');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var tools = require('aurelia-tools');
var nodemon = require('gulp-nodemon');

var path = {
  source:'public/app/src/**/*.js',
  html:'public/app/src/**/*.html',
  style:'public/app/styles/**/*.css',
  output:'public/app/dist/',
  doc:'public/app/doc'
};

var compilerOptions = {
  modules: 'system',
  moduleIds: false,
  comments: false,
  compact: false,
  stage:2,
  optional: [
    "es7.decorators",
    "es7.classProperties"
  ]
};

var jshintConfig = {esnext:true};

gulp.task('default', ['watch']);

gulp.task('clean', function() {
 return gulp.src([path.output])
    .pipe(vinylPaths(del));
});

gulp.task('build-system', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(path.output));
});

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(gulp.dest(path.output));
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('doc-generate', function(){
  return gulp.src(path.source)
    .pipe(yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(path.doc));
});

gulp.task('doc', ['doc-generate'], function(){
  tools.transformAPIModel(path.doc);
});

gulp.task('bump-version', function(){
  return gulp.src(['./package.json'])
    .pipe(bump({type:'patch'})) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

// gulp.task('changelog', function(callback) {
//   var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
// 
//   return changelog({
//     repository: pkg.repository.url,
//     version: pkg.version,
//     file: path.doc + '/CHANGELOG.md'
//   }, function(err, log) {
//     fs.writeFileSync(path.doc + '/CHANGELOG.md', log);
//   });
// });

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
    callback
  );
});

gulp.task('update-own-deps', function(){
  tools.updateOwnDependenciesFromLocalRepositories();
});

gulp.task('browser-sync', ['build', 'nodemon'], function() {
  browserSync.init({
    files: ['public/**/*.*'],
    proxy: 'http://localhost:9000',
    port: 7000,
    browser: ['google chrome']
  });
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js'
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
    }
    called = true;
  })
  .on('restart', function onRestart() {

    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

gulp.task('watch', ['nodemon', 'browser-sync'], function() {
  gulp.watch(path.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(path.style, browserSync.reload).on('change', reportChange);
});

gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'doc',
    // 'changelog',
    callback
  );
});
