'use strict';

const app = require('./app');
const { client, init } = require('./db/postgresConnection');

init();

app.locals.db = client;

app.listen(3030, () => console.log('Listening on port 3030'));
