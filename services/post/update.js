const boom = require('@hapi/boom');
const { Post: PostModel, sequelize } = require('../../models');
const PostUpdatesSchema = require('../../schema/postUpdates');
const findById = require('./findById');

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

const isAuthorized = async (postId, userId) => {
  const post = await findById(postId);
  return post.userId === userId;
};

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
