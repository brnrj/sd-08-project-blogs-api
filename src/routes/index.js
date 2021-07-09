const routes = require('express').Router();
const users = require('./users');
const login = require('./login');
const categories = require('./categories');

routes.get('/user', users);
routes.get('/user/:id', users);
routes.post('/user', users);
routes.post('/login', login);
routes.post('/categories', categories);

module.exports = routes;