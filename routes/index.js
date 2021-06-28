const routes = require('express').Router();

const userRouter = require('./user');
const loginRouter = require('./login');
const categoryRouter = require('./category');
const blogpostRouter = require('./blogpost');

routes.use('/user', userRouter);
routes.use('/login', loginRouter);
routes.use('/categories', categoryRouter);
routes.use('/post', blogpostRouter);

module.exports = routes;
