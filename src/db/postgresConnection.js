const { Client } = require('pg');

let client = {};

const init = () => {
	client = new Client({
        host: 'pg',
		database: process.env.PG_NAME,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
	});
	client.connect((error) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Database Connected');
		}
	});
};

module.exports = { client, init };
