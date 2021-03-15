'use strict';

const app = require('./app');
const { pgClient, initPgClient } = require('./db/postgresConnection');

initPgClient();

app.locals.db = pgClient;

app.listen(3030, () => console.log('Listening on port 3030'));
