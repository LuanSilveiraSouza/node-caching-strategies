const { Router } = require('express');
const User = require('./domain/User');

const router = Router();

router.use('/', async (req, res) => {
	const users = await User.getAll(req.app.locals.db);
	res.status(200).json(users || []);
});

module.exports = router;
