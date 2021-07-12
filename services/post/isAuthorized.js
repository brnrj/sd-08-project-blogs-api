const findById = require('./findById');

module.exports = async (postId, userId) => {
  const post = await findById(postId);
  return post.userId === userId;
};
