class User {
	constructor(name = '', age = 0) {
		this.id = Math.ceil(Math.random() * 10000);
		this.name = name;
		this.age = age;
	}
}

module.exports = User;
