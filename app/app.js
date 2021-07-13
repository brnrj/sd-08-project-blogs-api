const express = require('express');
const { usersRoute, loginRoute, categoriesRoute } = require('./routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
app.get('/', (_req, res) => res.send());
app.use(express.json());
app.use('/user', usersRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);
app.use(errorHandler);

module.exports = app;