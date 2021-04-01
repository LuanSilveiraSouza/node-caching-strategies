const { performance, PerformanceObserver } = require('perf_hooks');
const { Router } = require('express');
const { pgClient, seed } = require('./db/postgresConnection');
const { getAsync, setAsync, getKeysAsync } = require('./db/redisConnection');
const User = require('./domain/User');

const router = Router();

router.get('/', async (req, res) => {
	const { cache } = req.query;

	let benchmark;

	const perfObserver = new PerformanceObserver((items) => {
		benchmark = items.getEntries()[0];
	});
	perfObserver.observe({ entryTypes: ['measure'], buffer: true });

	let users;
	let metadata;

	if (cache == 'true') {
		performance.mark('redis_process_start');

		users = JSON.parse(await getAsync('users'));

		performance.mark('redis_process_end');

		performance.measure(
			'redis_process',
			'redis_process_start',
			'redis_process_end'
		);

		metadata = {
			process: 'Redis Cache',
			benchmark: benchmark,
		};
	}

	console.log(users);

	if (!users) {
		performance.mark('postgres_process_start');

		users = await User.getAll(pgClient);

		performance.mark('postgres_process_end');

		performance.measure(
			'postgres_process',
			'postgres_process_start',
			'postgres_process_end'
		);

		await setAsync('users', JSON.stringify(users));

		metadata = {
			process: 'Postgres Database',
			details: ['Added results in redis cache'],
			benchmark: benchmark,
		};
	}

	res.status(200).json({
		results: users || [],
		metadata,
	});
});

router.get('/seed', async (req, res) => {
	await seed();

	res.status(200).json({
		msg: 'Users seeded in postgres',
	});
});

module.exports = router;
