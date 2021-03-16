const uuid = require('uuid');

class User {
	constructor(name = '', age = 0) {
		this.id = uuid.v4();
		this.name = name;
		this.age = age;
	}

	async save(dbClient = {}) {
		if (dbClient) {
			await dbClient.query(
				`INSERT INTO users (id, name, age) VALUES ($1, $2, $3);`,
				[this.id, this.name, this.age]
			);
		}
	}

	static async getAll(dbClient = {}) {
		let results = {};

		if (dbClient) {
			const query = await dbClient.query(`SELECT * FROM users;`);
			results = query.rows;
		}

		return results;
	}
}

module.exports = User;
