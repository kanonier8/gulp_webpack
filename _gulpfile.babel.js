'use strict';

import gulp from 'gulp';
import stylus from 'gulp-stylus';
import autoprefixer from 'autoprefixer-stylus';
import pug from 'gulp-pug';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import clean from 'gulp-clean';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import base64 from 'gulp-base64';
import bSync from 'browser-sync';
import webpackConfig from './webpack.config.babel';
import webpackStream from 'webpack-stream';

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


// task for move js files
// ============================
gulp.task('webpack', () => {
	return gulp.src(PATH.WEBPACK)
		.pipe( webpackStream(webpackConfig) )
		.pipe( gulp.dest(`${dist}/build/`) )
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
					// 'webpack',
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
