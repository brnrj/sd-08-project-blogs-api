const routes = require('express').Router();
const users = require('./users');
const login = require('./login');

routes.get('/user', users);
routes.get('/user/:id', users);
routes.post('/user', users);
routes.post('/login', login);

module.exports = routes;