'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

app.use('/', (req, res) => {
	res.status(200).json({ msg: 'Hello World!' });
});

module.exports = app;