const { router } = require('express');
const createUser = require('../controllers/user');

const userRoute = router();

userRoute.route('/user')
  .post(createUser);

module.exports = userRoute;
