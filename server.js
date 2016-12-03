const express = require('express');
const server = express();
const browserSync = require('browser-sync');
const opn = require('opn');
const myipui = require('my-ip-ui');
const morgan = require('morgan');
const chalk = require('chalk');

const config = require('./config.json');
const publicDir = config.publicDir;
const pref = 'http://';
const host = config.host || 'localhost';
const port = config.port || 3080;
const browserSyncPort = config.browserSyncPort || 3010;

server.use(myipui({ port: port }));

morgan.token('date', () => {
	return new Date().toString();
});

server.use(morgan((tokens, req, res) => {
	let status = tokens.status(req, res);
	let method = tokens.method(req, res);
	let url = tokens.url(req, res);
	let date = tokens.date(req, res);
	date = '[' + date.match(/(\d\d:\d\d:\d\d)/g) + ']';
	let message = status + ' ' + method + ' ' + url;

	if (status === '404') {
		console.log(date + ' ' + chalk.red(message));
	} else {
		console.log(date + ' ' + chalk.green(message));
	}
}));

server.use(express.static(publicDir));

browserSync({
	proxy: host + ':' + port,
	files: [
		'dist' + '/**/*.html',
		'!' + 'build' + '/**/*.jspm.js',
		'dist' + '/*/**/*.js',
		'dist' + '/**/*.css'
	],
	logLevel: 'silent',
	logPrefix: 'dev-kit',
	port: browserSyncPort,
	open: false
});

server.listen(port, () => {
	console.log('');
	console.log('');
	console.log('Server started!');
	console.log('-------------------------------------------------------');
	console.log('HTTP Server        : ' + pref + host + ':' + port);
	console.log('BrowserSync Server : ' + pref + host + ':' + browserSyncPort);
	console.log('-------------------------------------------------------');
	console.log('');
	console.log('');
	opn(pref + host + ':' + port);
});
