const express  = require('express');
const browserSync = require('browser-sync');
const opn     = require("opn");
const pjson    = require('./package.json');
const myipui   = require('my-ip-ui');

const morgan = require('morgan');

const server   = express();

const pref     = 'http://';
const host     = pjson.host || 'localhost';
const port     = pjson.port || 3080;
const bsPort   = pjson.bsport || 3010;
const bsPortUI = pjson.bsportUI || 3091;

// MY IP UI
server.use(myipui({ port: port }));

server.use(morgan(':status :method :response-time :url'));
// EXPRESS STATIC
server.use(express.static('./public'));

browserSync({
	proxy: host + ':' + port,
	files: [
		'dist' + '/**/*.html',
		'!' + 'build' + '/**/*.jspm.js',
		'dist' + '/*/**/*.js',
		'dist' + '/**/*.css'
	],
	logPrefix: 'kk',
	port: bsPort,
	open: false
});


// START SERVER ON DEFINED PORT
server.listen(port, function() {
	console.log('');
	console.log('');
	console.log('Server started!');
	console.log('-------------------------------------------------------');
	console.log('HTTP Server        : ' + pref + host + ':' + port);
	console.log('BrowserSync Server : ' + pref + host + ':' + bsPort);
	console.log('-------------------------------------------------------');
	console.log('');
	console.log('');
	opn(pref + host + ':' + port);
});
