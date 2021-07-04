const boom = require('@hapi/boom');
const { Post } = require('../../database/models');

module.exports = async (id) => {
  const result = await Post.findOne({
    where: { id },
    include: ['user', 'categories'],
  });

  if (!result) throw boom.notFound('Post does not exist');

  return result;
};
