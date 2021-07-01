const express = require('express');

const loginRoutes = express.Router();
loginRoutes.use(express.json());
const loginUser = require('../controllers/LoginControllers/login');

loginRoutes.post('/', loginUser);

module.exports = loginRoutes;
