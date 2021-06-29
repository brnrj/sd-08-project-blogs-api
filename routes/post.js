const { Router } = require('express');
const { createPost, getAllPost, getById } = require('../controllers/post');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const postRoute = Router();

postRoute.route('/post')
  .get(validateToken, getAllPost)
  .post(validateToken, createPost);

postRoute.route('/post/:id')
  .get(validateToken, getById);

module.exports = postRoute;
