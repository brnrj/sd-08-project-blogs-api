const routes = require('express').Router();

const UserRoute = require('./userRoute');
const LoginRoute = require('./loginRoute');
const CategoriesRoute = require('./categoryRoute');
const PostRoute = require('./postRoute');

routes.use('/user', UserRoute);
routes.use('/login', LoginRoute);
routes.use('/categories', CategoriesRoute);
routes.use('/post', PostRoute);

module.exports = routes;
