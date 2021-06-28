const { Router } = require('express');
const { login } = require('../controllers/login');

const loginRoute = Router();

loginRoute.route('/login')
  .post(login);

module.exports = loginRoute;
