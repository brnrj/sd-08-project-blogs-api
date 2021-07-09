const routes = require('express').Router();
const PostsController = require('../controllers/Posts');

routes.post('/post', PostsController.create);

module.exports = routes;