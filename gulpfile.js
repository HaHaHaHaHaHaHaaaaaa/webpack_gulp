'use strict'
var gulp = require('gulp');
var minify=require('gulp-minify');
var css=require('gulp-css');
var html=require('gulp-html');
var autopre=require('gulp-autoprefixer');
gulp.task('default',function(){
    gulp.src('js/*.js').pipe(minify()).pipe(gulp.dest('dist'));
   /*  gulp.src('css/*.css').pipe(css()).pipe(gulp.dest('dist')); */
    gulp.src('assets/*.png').pipe(gulp.dest('dist/assets'));
    gulp.src('share.html').pipe(html()).pipe(gulp.dest('dist'));
    gulp.src('css/*.css').pipe(autopre({
        browsers:['last 2 versions'],
        cascade:false
    })).pipe(gulp.dest('dist/test'))
})

