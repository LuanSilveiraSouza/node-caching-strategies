const { performance, PerformanceObserver } = require('perf_hooks');
const { Router } = require('express');
const { pgClient } = require('./db/postgresConnection');
const { getAsync, setAsync, getKeysAsync } = require('./db/redisConnection');
const User = require('./domain/User');

const router = Router();

router.use('/', async (req, res) => {
	let benchmark;

	const perfObserver = new PerformanceObserver((items) => {
		benchmark = items.getEntries()[0];
	});
	perfObserver.observe({ entryTypes: ['measure'], buffer: true });

	performance.mark('database_process_start');

	const users = await User.getAll(pgClient);

	performance.mark('database_process_end');

	performance.measure(
		'database_process',
		'database_process_start',
		'database_process_end'
	);

	res.status(200).json({
		results: users || [],
		metadata: {
			process: 'Postgres Database',
			benchmark: benchmark,
		},
	});
});

module.exports = router;
