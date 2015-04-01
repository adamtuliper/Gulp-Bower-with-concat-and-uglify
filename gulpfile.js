//initial source http://engineroom.teamwork.com/hassle-free-third-party-dependencies/

var gulp = require('gulp');  
var concat = require('gulp-concat');  
var filter = require('gulp-filter'); 
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

var mainBowerFiles = require('main-bower-files');

var filterByExtension = function(extension){  
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};


gulp.task('ConcatAndUglify', function () {
    var mainFiles = mainBowerFiles();

    if (!mainFiles.length) {
        // No main files found. Skipping....
        return;
    }

    mainFiles.forEach(function (entry) {
        console.log(entry);
    }
    )
    var jsFilter = filterByExtension('js');

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(concat('third-party-scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app'))
        .pipe(jsFilter.restore())
        .pipe(filterByExtension('css'))
        .pipe(concat('third-party-styles.css'))
        .pipe(gulp.dest('./app'));
});

gulp.task('default',['ConcatAndUglify'], function(){  
    //inject scripts AFTER concat step is done.
    gulp.src('./*.html')
    .pipe(inject(gulp.src('./app/**/*.js', { read: false }), { relative: true }))
    .pipe(gulp.dest('./app'));
});