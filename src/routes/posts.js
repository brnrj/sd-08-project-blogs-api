const routes = require('express').Router();
const PostsController = require('../controllers/Posts');

routes.post('/post', PostsController.create);
routes.get('/post', PostsController.index);
routes.get('/post/:id', PostsController.show);
routes.put('/post/:id', PostsController.update);
routes.delete('/post/:id', PostsController.delete);

module.exports = routes;