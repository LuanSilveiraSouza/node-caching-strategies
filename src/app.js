'use strict';

const express = require('express');
const cors = require('cors');
const router = require('router');

const app = express();

app.use(cors({ origin: '*' }));
app.use(router);

module.exports = app;