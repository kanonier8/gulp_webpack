'use strict';

let gulp = require('gulp');
let stylus = require('gulp-stylus');
let autoprefixer = require('autoprefixer-stylus');
let pug = require('gulp-pug');
let sourcemaps = require('gulp-sourcemaps');
let gulpIf = require('gulp-if');
let clean = require('gulp-clean');
let newer = require('gulp-newer');
let plumber = require('gulp-plumber');
let base64 = require('gulp-base64');
let bSync = require('browser-sync');


const browserSync = bSync.create();
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
const source = 'source';
const dist = 'dist';
const PATH = {
	WEBPACK: `${source}/**/*.*`,
	IMG: `${source}/assets/img/**/*.*`,
	FONTS: `${source}/assets/fonts/**/*.*`,
	VENDOR: `${source}/assets/vendor/**/*.*`,
	JSON: `${source}/assets/json/**/*.*`,
	ASSETS: `${source}/assets/**/*.*`,
	STYLUS: `${source}/stylus/index.styl`,
	STYLUS_ALL: `${source}/stylus/**/*.styl`,
	PUG: `${source}/pug/*.pug`,
	PUG_ALL: `${source}/pug/**/*.pug`,
	DEST: dist
}

// task for stylus file compile
// ============================
gulp.task('styles', () => {
	return gulp.src(PATH.STYLUS)
		.pipe( plumber() )
		.pipe( stylus({
			use: [ autoprefixer() ],
			compress: true
		}) )
		.pipe( base64({maxImageSize: 8*1024}) )
		.pipe( gulp.dest(`${dist}/css`) );
});

// task for pug file compile
// ==========================
gulp.task('pug', () => {
	const options = {
		pretty: true
	};
	return gulp.src(PATH.PUG)
		.pipe( plumber() )
		.pipe( pug(options) )
		.pipe( gulp.dest(`${dist}/`) )
});


// task for clean`${dist} folder
// ============================
gulp.task('clean', () => {
	return gulp.src(`${dist}/*`)
		.pipe( clean() )
});


// task for assets optimize
// ============================
gulp.task('assets', () => {
	return gulp.src(PATH.ASSETS, {since: gulp.lastRun('assets')})
		.pipe( newer(`${dist}/assets/`) )
		.pipe( gulp.dest(`${dist}/assets`) )
})


// task for change watch
// =====================
gulp.task('watch', () => {
	gulp.watch(PATH.STYLUS_ALL, gulp.series('styles'));
	gulp.watch(PATH.PUG_ALL, gulp.series('pug'));
	gulp.watch(PATH.ASSETS, gulp.series('assets'));
	// gulp.watch(PATH.WEBPACK, gulp.series('webpack'));
});

// task for build project
// ======================
gulp.task('build', gulp.series(
					'clean',
					'assets',
					gulp.parallel('styles', 'pug'))
);

// task for run BrowserSync server
// ===============================
gulp.task('serve', function(callback) {
	browserSync.init({
		server: `${dist}/`
	});
	browserSync.watch(`${dist}/**/*.*`).on('change', browserSync.reload);
	callback();
});


// run project develop
// ===================
gulp.task('dev', gulp.series(
					'build',
					gulp.parallel('watch','serve'))
);
