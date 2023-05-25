const path = require('path');
const logger = require('./util/logger');
const configDir = path.join(__dirname, 'config');

const exec = () => {
	_setConfig();

	// initialize logger
	logger.init();

}

function _setConfig() {
	let node_env = nconf.env().get('NODE_ENV') || 'default';
	node_env += '.json';
	if (!fs.existSync(appConfigPath)) {
		console.log(new Date().toISOString(), 'Missing application config! Expected config file at path: ', appConfigPath);
	} else {
		nconf.use('app', {
			type: 'file',
			file: appConfigPath
		})
	}
	return;
}

module.exports = {
	exec: exec
}
