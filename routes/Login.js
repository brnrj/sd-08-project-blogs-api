const express = require('express');
const Controller = require('../controllers').Users;
const isBodyValidFor = require('../middlewares/validations').Users;
const { notFoundHandler } = require('../middlewares');

const route = express.Router();

route.post('/', isBodyValidFor('login'), Controller.login);

route.use('/:notFound', notFoundHandler);

module.exports = route;
