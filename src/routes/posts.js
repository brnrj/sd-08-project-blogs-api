const routes = require('express').Router();
const PostsController = require('../controllers/Posts');

routes.post('/post', PostsController.create);
routes.delete('/post/:id', PostsController.delete);

module.exports = routes;