const { Post: PostModel, sequelize } = require('../models');
const { PostSchema } = require('../schema');
const { customError } = require('../utils/index');

const createOne = async (newPost) => {
  const { error } = PostSchema.validate(newPost);

  if (error) return customError(error.details[0].message, 'invalidData');

  return sequelize.transaction(async (transaction) => {
    const { title, content, userId, categoryIds } = newPost;

    const post = await PostModel.create(
      { title, content, userId },
      { transaction },
    );
    // console.log(post);
    // try {
    //   await post.addCategories(categoryIds, { transaction });
    // } catch (err) {
    //   return customError('"categoryIds" not found');
    // }

    return { id: post.id, userId, title, content };
  });
};

const findAll = async () => PostModel.findAll({
  include: ['user', 'categories'],
});

module.exports = {
  createOne,
  findAll,
};
