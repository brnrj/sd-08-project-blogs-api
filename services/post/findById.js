const boom = require('@hapi/boom');
const { Post: PostModel } = require('../../models');

module.exports = async (id) => {
  const result = await PostModel.findOne({
    where: { id },
    include: ['user', 'categories'],
  });

  if (!result) throw boom.notFound('Post does not exist');

  return result;
};
