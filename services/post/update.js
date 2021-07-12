const boom = require('@hapi/boom');
const { Post: PostModel, sequelize } = require('../../models');
const PostUpdatesSchema = require('../../schema/postUpdates');
const isAuthorized = require('./isAuthorized');

const findPost = async (id, transaction) => PostModel.findOne({
  where: { id },
  attributes: { exclude: ['id', 'published', 'updated'] },
  include: {
    model: sequelize.models.Category,
    as: 'categories',
    through: { attributes: [] },
  },
  transaction,
});

module.exports = async (postId, postUpdates, userId) => {
  const { error } = PostUpdatesSchema.validate(postUpdates);

  if (error) throw error;

  const grantAccess = await isAuthorized(postId, userId);

  if (!grantAccess) throw boom.unauthorized('Unauthorized user');

  return sequelize.transaction(async (transaction) => {
    const id = await PostModel.update(
      postUpdates,
      { where: { id: postId }, transaction, fields: ['title', 'content'] },
    );

    return findPost(id, transaction);
  });
};
