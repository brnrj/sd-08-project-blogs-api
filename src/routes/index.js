const { Router } = require('express');

const userRoutes = require('./user.routes');
const loginRoutes = require('./login.routes');
const postRoutes = require('./post.routes');
const categoriesRoutes = require('./categories.routes');

const appRoutes = Router();

appRoutes.use('/user', userRoutes);
appRoutes.use('/login', loginRoutes);
appRoutes.use('/post', postRoutes);
appRoutes.use('/categories', categoriesRoutes);

module.exports = appRoutes;
