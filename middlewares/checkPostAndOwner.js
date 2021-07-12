const rescue = require('express-rescue');

const { Post } = require('../models');

module.exports = rescue(async (req, _res, next) => {
  const { id: postId } = req.params;
  const userId = req.user;

  const post = await Post.findOne({ where: { id: postId } });

  if (!post) {
    const err = new Error('Post does not exist');
    err.statusCode = 404;
    throw err;
  }

  // console.log('CHECK', post, post.userId, userId);

  if (post.userId !== userId) {
    const err = new Error('Unauthorized user');
    err.statusCode = 401;
    throw err;
  }
  
  return next();
});