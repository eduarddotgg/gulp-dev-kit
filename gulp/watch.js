import watch from 'gulp-watch';
import path from 'path';


export default (gulp, env, config) => {
	const SOURCE_DIR = config.sourceDir;

	gulp.task('watch', () => {
		watch(path.join(SOURCE_DIR, '/views/**/*.pug'), () => {
			gulp.start('build:html');
		});

		watch(path.join(SOURCE_DIR, '/js/**/*.js'), () => {
			gulp.start('build:js');
			gulp.start('lint:js');
		});

		watch(path.join(SOURCE_DIR, '/pcss/**/*.pcss'), () => {
			gulp.start('build:css');
			gulp.start('lint:css');
		});

		watch(path.join(SOURCE_DIR, '/img/**/*.*'), () => {
			gulp.start('minify:images');
		});
	});
};
