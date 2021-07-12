const express = require('express');
const { usersRoute, loginRoute } = require('./routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/user', usersRoute);
app.use('/login', loginRoute);
app.use(errorHandler);

app.get('/', (_req, res) => res.send());

module.exports = app;