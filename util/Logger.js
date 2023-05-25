'use strict';
const path = require('path');
const nconf = require('nconf');
const winston = require('winston');
const stack = require('callsite');
// const cmuUtil = require('./cmuUtil');
const moment = require('moment');
const fs = require('fs');
const logLevel = 'info';

winston.emitErrs = true;
winston.exitOnError = false;

let GenericLogger;

const init = () => {
	let folderPath = nconf.get('logPath');
	let archiveDir = path.join(folderPath, '/archive/');
	if (!fs.existSync(archiveDir)) {
		fs.mkdirSync(archiveDir);
	}

	GenericLogger = new winston.Logger({
		transports: [
			new (require('winston-daily-rotate-file'))({
				filename: path.join(folderPath, 'program_%DATE%.log'),
				dataPattern: 'YYYYMMDD',
				zippedArchive: true,
				maxSize: '10M',
				maxFiles: '3',
				timestamp: function() {
					return moment().format('DD MM YYYY HH:mm:ss');
				},
				fomatter: function(options) {
					return options.timestamp() + ' ' +
						options.level.toUpperCase() + ' ' +
						(options.message ? options.message : '') +
						(options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '');
				},
				json: false,
				level: logLevel
			}).on('archive', function(zippedFilename) {
				let archivedFilename = zippedFilename.replace(folderPath, archiveDir);
				console.log('archive to: ' + archivedFilename);
				fs.rename(zippedFilename, archivedFilename, function(err) {
					if (err) throw err;
					console.log('Move Complelte');
				});
			}),
		],
		exceptionHandlers: [
			new (require('winston-daily-rotate-file'))({
				filename: path.join(folderPath, 'exception_%DATE%.log'),
				dataPattern: 'YYYYMMDD',
				zippedArchive: true,
				maxSize: '10M',
				maxFiles: '3',
				timestamp: function() {
					return moment().format('DD MM YYYY HH:mm:ss');
				},
				fomatter: function(options) {
					return options.timestamp() + ' ' +
						options.level.toUpperCase() + ' ' +
						(options.message ? options.message : '') +
						(options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '');
				},
				handleExceptions: true,
				json: false
			}).on('archive', function(zippedFilename) {
				let archivedFilename = zippedFilename.replace(folderPath, archiveDir);
				console.log('archive to: ' + archivedFilename);
				fs.rename(zippedFilename, archivedFilename, function(err) {
					if (err) throw err;
					console.log('Move Complelte');
				});
			}),
		]
	});

	winston.loggers.add('api', {
		transports: [
			new (require('winston-daily-rotate-file'))({
				filename: path.join(folderPath, 'api_%DATE%.log'),
				dataPattern: 'YYYYMMDD',
				zippedArchive: true,
				maxSize: '10M',
				maxFiles: '7d',
				timestamp: function() {
					return moment().format('DD MM YYYY HH:mm:ss');
				},
				fomatter: function(options) {
					return options.timestamp() + ' ' +
						options.level.toUpperCase() + ' ' +
						(options.message ? options.message : '') +
						(options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '');
				},
				json: false,
				level: logLevel
			}).on('archive', function(zippedFilename) {
				let archivedFilename = zippedFilename.replace(folderPath, archiveDir);
				console.log('archive to: ' + archivedFilename);
				fs.rename(zippedFilename, archivedFilename, function(err) {
					if (err) throw err;
					console.log('Move Complelte');
				});
			}),
		]
	})
};

module.exports = {
	init: init,
	api: function(p_msg) {
		winston.loggers.get('api').info('[{0}] {1}'.format(
			stack()[1].getFunctionName() || 'anonymous',
			p_msg));
	},
	info: function(p_msg) {
		GenericLogger.info('[{0}] {1}'.format(
			stack()[1].getFunctionName() || 'anonymous',
			p_msg));
	},
	debug: function(p_msg) {
		GenericLogger.debug('[{0}] {1}'.format(
			stack()[1].getFunctionName() || 'anonymous',
			p_msg));
	},
	error: function(p_err) {
		GenericLogger.error('[{0}] {1}'.format(
			stack()[1].getFunctionName() || 'anonymous',
			p_err));
	},
	log: function(p_cat, p_err) {
		GenericLogger.log(p_cat, '[{0}] {1}'.format(
			stack()[1].getFunctionName() || 'anonymous',
			p_err));
	}
};
