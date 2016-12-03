import gulp from 'gulp';
import runSequence from 'run-sequence';
import { argv } from 'yargs';
import config from './config.json';

import buildHTML from './gulp/build.html';
import buildJS from './gulp/build.js';
import buildCSS from './gulp/build.css';
import minifyIMAGES from './gulp/images';
import lint from './gulp/lint';
import watch from './gulp/watch';
import clean from './gulp/clean';

let env = argv.env || 'development';

buildHTML(gulp, env, config);
buildJS(gulp, env, config);
buildCSS(gulp, env, config);
minifyIMAGES(gulp, env, config);
watch(gulp, env, config);
lint(gulp, env, config);
clean(gulp, env, config);


gulp.task('build', (cb) => {
	runSequence('build:html', 'build:js', 'build:css', cb);
});

if (env !== 'production') {
	gulp.task('default', (cb) => {
		runSequence('build', 'lint:js', 'lint:css', 'watch', cb);
	});
} else {
	gulp.task('default', ['clean'], () => {
		gulp.start('build');
	});
}

