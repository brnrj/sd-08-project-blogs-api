const routes = require('express').Router();
const users = require('./users');

routes.post('/users', users);

module.exports = routes;