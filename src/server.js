'use strict';

const app = require('./app');
const {
	pgClient,
	migrateUp,
	seed,
} = require('./db/postgresConnection');

(async function () {
	await pgClient.connect();
	await migrateUp();

	app.listen(3030, () => console.log('Listening on port 3030'));
})();
