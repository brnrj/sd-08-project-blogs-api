const boom = require('@hapi/boom');
const { Post } = require('../../database/models');
const PostUpdatesSchema = require('../../schema/postUpdates');
const isAuthorized = require('./isAuthorized');

const findPost = async (id) => Post.findByPk(id, {
  attributes: { exclude: ['id', 'published', 'updated'] },
  include: { association: 'categories', through: { attributes: [] } },
});

module.exports = async (postId, postUpdates, userId) => {
  const { error } = PostUpdatesSchema.validate(postUpdates);

  if (error) throw error;

  const grantAccess = await isAuthorized(postId, userId);

  if (!grantAccess) throw boom.unauthorized('Unauthorized user');

  const [id] = await Post.update(
    postUpdates,
    { where: { id: postId }, fields: ['title', 'content'] },
  );

  return findPost(id);
};
