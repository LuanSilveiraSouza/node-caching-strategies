const redis = require('redis');
const { promisify } = require('util');

let redisClient = redis.createClient({
	host: 'redis',
	db: process.env.REDIS_DATABASE,
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const getKeysAsync = promisify(redisClient.keys).bind(redisClient);
const quitAsync = promisify(redisClient.quit).bind(redisClient);
const clearAsync = promisify(redisClient.flushdb).bind(redisClient);

module.exports = {
	redisClient,
	getAsync,
	setAsync,
	getKeysAsync,
	quitAsync,
	clearAsync,
};
