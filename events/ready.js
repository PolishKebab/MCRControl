const { prefix,status } = require('../config.json');
exports.run=(client) => {
    	client.user.setActivity(`${status} | ${prefix}help`, { type: 'WATCHING' });
		console.log('Ready!');
};
