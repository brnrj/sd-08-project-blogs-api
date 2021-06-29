const boom = require('@hapi/boom');
const { Post: PostModel, sequelize } = require('../../models');
const PostSchema = require('../../schema/post');

module.exports = async (newPost) => {
  const { error } = PostSchema.validate(newPost);
  
  if (error) throw error;

  return sequelize.transaction(async (transaction) => {
    const { title, content, userId, categoryIds } = newPost;

    const post = await PostModel.create(
      { title, content, userId },
      { transaction },
    );

    try {
      await post.addCategories(categoryIds, { transaction });
    } catch (err) {
      throw boom.badRequest('"categoryIds" not found');
    }

    return { id: post.id, userId, title, content };
  });
};
