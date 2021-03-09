'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

app.use('/', (req, res) => {
	res.status(200).json({ msg: 'Hello World!' });
});

app.listen(3030, () => console.log('Listening on port 3030'));
