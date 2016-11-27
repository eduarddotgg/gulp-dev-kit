import jspm from 'gulp-jspm';
import changed from 'gulp-changed';
import path from 'path';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';


export default (gulp, env, config) => {
	const SOURCE_DIR = [
		path.join(config.sourceDir, '/**/*.jspm.js'),
		path.join('!' + config.sourceDir, '/**/_*.js')
	];
	const BUILD_DIR = path.join(config.publicDir, '/assets/js');

	gulp.task('build:js', () => {
		return gulp.src(SOURCE_DIR)
			.pipe(changed(BUILD_DIR))
			.pipe(env !== 'production' ? sourcemaps.init() : gutil.noop())
			.pipe(jspm({
				minify: true,
				selfExecutingBundle: true
			}))
			.pipe(rename( (filePath) => {
				filePath.basename = filePath.basename.replace('.bundle.jspm', '');
				filePath.basename = filePath.basename.replace('_', '');
			}))
			.pipe(rename({
				suffix: '.min',
				extname: '.js'
			}))
			.pipe(env !== 'production' ? sourcemaps.write() : gutil.noop())
			.pipe(gulp.dest(BUILD_DIR));
	});
};
