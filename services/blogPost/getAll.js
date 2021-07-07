const { Post, User } = require('../../models');

module.exports = async () => {
  const posts = await Post.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      'categories',
    ],
  });

  return posts;
};