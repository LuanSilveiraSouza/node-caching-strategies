'use strict';

const app = require('./app');
const {
	pgClient,
	migrateUp,
	seed,
    migrateDown,
} = require('./db/postgresConnection');

(async function () {
	await pgClient.connect();
	await migrateUp();
	await seed();

	app.locals.db = pgClient;

	app.listen(3030, () => console.log('Listening on port 3030'));
})();
