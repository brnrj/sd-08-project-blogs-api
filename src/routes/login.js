const routes = require('express').Router();
const SessionsController = require('../controllers/Sessions');

routes.post('/login', SessionsController.login);

module.exports = routes;