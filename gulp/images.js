import imagemin from 'imagemin';
import pngquant from 'imagemin-pngquant';
import path from 'path';
import gutil from 'gulp-util';


export default (gulp, env, config) => {
	const SOURCE_DIR = path.join(config.sourceDir, 'img/**/*.*');
	const BUILD_DIR = path.join(config.publicDir);

	const IMGMIN_CONFIG = {
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngquant()]
	};

	gulp.task('minify:images', () => {
		return gulp.src(SOURCE_DIR)
			.pipe(env === 'production' ? imagemin(IMGMIN_CONFIG) : gutil.noop())
			.pipe(gulp.dest(BUILD_DIR));
	});
};
