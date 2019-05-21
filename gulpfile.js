const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
	-- TOP LEVEL FUNCTIONS --
	gulp.task - Define tasks
	gulp.src - Point to files to use
	gulp.dest - Points to folder to output
	gulp.watch - Watch files and folders for changes
*/

gulp.task('message', function() {
	console.log("gulp is running...");
});

// copy all HTML files
gulp.task('copyHtml', function() {
	console.log("copyHtml is running...");
	return gulp.src('src/*.html')
			.pipe(gulp.dest('dist'));
});

gulp.task('imageMin', function(){
  return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
			.pipe(concat('main.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'))
});

gulp.task('sass', function() {
	return gulp.src("src/sass/*.scss")
			.pipe(sass().on("error", sass.logError))
			.pipe(gulp.dest("dist/css"))
});

gulp.task('default', gulp.parallel('message', 'copyHtml', 'imageMin', 'scripts', 'sass'), function() {
	console.log("done...");
});

gulp.task('watch', function() {
	gulp.watch('src/*.html', gulp.series('copyHtml'));
	gulp.watch('src/images/*', gulp.series('imageMin'));
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/sass/*.scss', gulp.series('sass'));
});