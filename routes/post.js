const { Router } = require('express');
const { createPost } = require('../controllers/post');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const postRoute = Router();

postRoute.route('/post').post(validateToken, createPost);

module.exports = postRoute;
