const boom = require('@hapi/boom');
const { sequelize } = require('../../models');
const isAuthorized = require('./isAuthorized');
const findById = require('./findById');

module.exports = async (postId, userId) => {
  const post = await findById(postId);

  if (!post) throw boom.notFound('Post does not exist');

  const grantAccess = await isAuthorized(postId, userId);

  if (!grantAccess) throw boom.unauthorized('Unauthorized user');

  return sequelize.transaction(async (transaction) => post.destroy({ transaction }));
};
