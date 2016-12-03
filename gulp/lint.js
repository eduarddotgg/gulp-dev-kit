import eslint from 'gulp-eslint';
import path from 'path';
import postcss from 'gulp-postcss';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';


export default (gulp, env, config) => {
	const SOURCE_DIR = path.join(config.sourceDir);

	gulp.task('lint:js', () => {
		return gulp.src(path.join(SOURCE_DIR, '/js/**/*.js'))
			.pipe(eslint({
				configFile: './.eslintrc',
				envs: ['browser']
			}))
			.pipe(eslint.format());
	});

	gulp.task('lint:css', () => {
		return gulp.src(path.join(SOURCE_DIR, '/pcss/**/*.pcss'))
			.pipe(postcss([
				stylelint({
					configFile: './.stylelintrc'
				}),
				reporter({
					clearMessages: true,
					throwError: false
				})
			]));
	});
};
