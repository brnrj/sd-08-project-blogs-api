const routes = require('express').Router();

const UserRoute = require('./userRoute');
const LoginRoute = require('./loginRoute');

routes.use('/user', UserRoute);
routes.use('/login', LoginRoute);

module.exports = routes;
