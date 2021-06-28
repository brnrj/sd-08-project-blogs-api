const { Router } = require('express');
const { createUser, getAllUsers } = require('../controllers/user');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const userRoute = Router();

userRoute.route('/user')
  .post(createUser)
  .get(validateToken, getAllUsers);

module.exports = userRoute;
