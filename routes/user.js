const { Router } = require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/user');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const userRoute = Router();

userRoute.route('/user')
  .post(createUser)
  .get(validateToken, getAllUsers);

userRoute.route('./user/:id').get(validateToken, getUserById);
  
module.exports = userRoute;
