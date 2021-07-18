const { findById } = require('../services/post');

const getAuthorization = async (postId, userId) => {
  const post = await findById(postId);

  return post.userId === userId;
};

module.exports = getAuthorization;
