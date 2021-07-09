const routes = require('express').Router();
const UsersController = require('../controllers/Users');

routes.post('/user', UsersController.create);

module.exports = routes;