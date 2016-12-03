import del from 'del';
import path from 'path';


export default (gulp, env, config) => {
	const BUILD_DIR = path.join(config.publicDir);

	gulp.task('clean', () => {
		return del.sync(BUILD_DIR, { force: true });
	});
};
