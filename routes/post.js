const { Router } = require('express');
const { createPost, getAllPost } = require('../controllers/post');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const postRoute = Router();

postRoute.route('/post')
  .get(validateToken, getAllPost)
  .post(validateToken, createPost);

module.exports = postRoute;
