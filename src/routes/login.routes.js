const { Router } = require('express');

// const validateLogin = require('../middlewares/validateLogin');

// const LoginController = require('../controllers/LoginController');

const loginRoutes = Router();

loginRoutes.post('/', () => 'PostLogin');

module.exports = loginRoutes;