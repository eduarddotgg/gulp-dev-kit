import pug from 'gulp-pug';
import changed from 'gulp-changed';
import path from 'path';
import posthtml from 'gulp-posthtml';
import validate from 'posthtml-w3c';
import rename from 'gulp-rename';


export default (gulp, env, config) => {
	const SOURCE_DIR = [
		path.join(config.sourceDir, '/views/**/*.pug'),
		path.join('!' + config.sourceDir, '/views/**/_*.pug')
	];
	const BUILD_DIR = path.join(config.publicDir);

	gulp.task('build:html', () => {
		return gulp.src(SOURCE_DIR)
			.pipe(changed(BUILD_DIR))
			.pipe(pug({
				pretty: env !== 'production'
			}))
			.pipe(posthtml([validate()]))
			.pipe(rename({
				dirname: ''
			}))
			.pipe(gulp.dest(BUILD_DIR));
	});
};

