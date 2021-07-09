const routes = require('express').Router();
const UsersController = require('../controllers/Users');

routes.get('/user', UsersController.index);
routes.post('/user', UsersController.create);

module.exports = routes;