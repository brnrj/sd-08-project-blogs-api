const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const HandleError = require('../http/errors/HandleError');

exports.registerPost = async ({ userId, title, content, categoryIds }) => {
  const categoryExists = await Category.count({
    where: {
      id: {
        [Op.or]: categoryIds,
      },
    },
  });
  if (!categoryExists 
    || categoryExists < categoryIds.length) throw new HandleError('"categoryIds" not found', 400);
  const published = new Date();
  
  const post = await BlogPost.create({ 
    title, content, userId, published, 
  });
  const postsCategories = categoryIds.map((categoryId) => ({ postId: post.id, categoryId }));
  await PostCategory.bulkCreate(postsCategories);
  return post;
};

exports.findByPost = async ({ id }) => {
  const [category] = await BlogPost.findAll({
    where: {
      id,
    },
    include: [
      { model: User, as: 'user' }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!category) throw new HandleError('Post does not exist', 404);
  return category;
};

exports.editPost = async ({ userId, postId, title, content }) => {
  const [postContent] = await BlogPost.findAll({ where: { id: Number(postId) } });
  if (!postContent) throw new HandleError('Post does not exist', 404);
  if (postContent.userId !== userId) throw new HandleError('Unauthorized user', 401);
  await BlogPost.update({ title, content }, {
    where: {
      id: postId,
    },
  });
  const reuslt = await BlogPost.findOne({
    where: {
      id: postId,
    },
    include: [
      { model: User, as: 'user' }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return reuslt;
};

exports.excludePost = async ({ userId, postId }) => {
  const [postContent] = await BlogPost.findAll({ where: { id: Number(postId) } });
  if (!postContent) throw new HandleError('Post does not exist', 404);
  if (postContent.userId !== userId) throw new HandleError('Unauthorized user', 401);
  await BlogPost.destroy({
    where: { id: postId } });
};
