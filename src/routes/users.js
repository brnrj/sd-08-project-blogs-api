const routes = require('express').Router();
const UsersController = require('../controllers/Users');

routes.get('/user', UsersController.index);
routes.get('/user/:id', UsersController.show);
routes.post('/user', UsersController.create);

module.exports = routes;