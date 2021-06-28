const { Router } = require('express');
const { createUser } = require('../controllers/user');

const userRoute = Router();

userRoute.route('/user')
  .post(createUser);

module.exports = userRoute;
