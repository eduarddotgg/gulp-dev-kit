import changed from 'gulp-changed';
import rename from 'gulp-rename';
import path from 'path';

import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import mscale from 'postcss-modular-scale';
import lh from 'postcss-lh';
import vars from 'postcss-css-variables';
import minmax from 'postcss-media-minmax';
import customMedia from 'postcss-custom-media';
import nested from 'postcss-nested';
import grid from 'postcss-simple-grid';
import autoprefixer from 'autoprefixer';
import font from 'postcss-font-magician';
import customProperties from 'postcss-custom-properties';
import query from 'css-mqpacker';
import cssnano from 'cssnano';
// import sugarss from 'sugarss';

export default (gulp, env, config) => {
	const SOURCE_DIR = [
		path.join(config.sourceDir, '/pcss/*.pcss'),
		path.join('!' + config.sourceDir, '/pcss/**/_*.pcss')
	];
	const BUILD_DIR = path.join(config.publicDir, '/assets/css');

	const POSTCSS_CONFIG = [
		postcssImport,
		mscale,
		lh,
		vars,
		nested,
		minmax,
		customMedia,
		grid({ separator: '--' }),
		autoprefixer,
		font,
		customProperties,
		query({ sort: true }),
		cssnano
	];

	gulp.task('build:css', () => {
		return gulp.src(SOURCE_DIR)
			.pipe(changed(BUILD_DIR))
			.pipe(postcss(POSTCSS_CONFIG, {
				// parser: sugarss,
				map: { inline: env !== 'production' }
			}))
			.pipe(rename({
				suffix: '.min',
				extname: '.css'
			}))
			.pipe(gulp.dest(BUILD_DIR));
	});
};
