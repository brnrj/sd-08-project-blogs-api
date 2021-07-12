const express = require('express');
const { usersRoute, loginRoute } = require('./routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
app.get('/', (_req, res) => res.send());
app.use(express.json());
app.use('/user', usersRoute);
app.use('/login', loginRoute);
app.use(errorHandler);

module.exports = app;