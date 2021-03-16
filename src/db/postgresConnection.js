const { Client } = require('pg');
const faker = require('faker');

const User = require('../domain/User');

const pgClient = new Client({
	host: 'pg',
	database: process.env.PG_NAME,
	user: process.env.PG_USER,
	password: process.env.PG_PASS,
});

const migrateUp = async () => {
	await pgClient.query(
		`CREATE TABLE IF NOT EXISTS users (
			id UUID NOT NULL PRIMARY KEY,
			name VARCHAR(50),
			age INT
		);`
	);
	await pgClient.query(`TRUNCATE TABLE users;`);
};

const migrateDown = async () => {
	await pgClient.query(`DROP TABLE users CASCADE;`);
};

const seed = async () => {
	for (let i = 0; i < 1000; i++) {
		const user = new User(
			faker.name.findName(),
			new Date().getFullYear() -
				faker.date.between(new Date('1910'), new Date()).getFullYear()
		);

		await user.save(pgClient);
	}
};

module.exports = { pgClient, migrateUp, migrateDown, seed };
