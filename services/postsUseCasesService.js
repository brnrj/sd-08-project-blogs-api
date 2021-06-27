const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const HandleError = require('../http/errors/HandleError');

exports.registerPost = async ({ userId, title, content, categoryIds }) => {
  const [categoryExists] = await BlogPost.findAll({
    where: {
      id: {
        [Op.eq]: categoryIds,
      },
    },
  });

  if (!categoryExists) throw new HandleError('"categoryIds" not found', 400);
  const published = new Date();

  const post = await BlogPost.create({ 
    title, content, userId, published, 
  });
  return post;
};

exports.findByPost = async ({ id }) => {
  const [category] = await BlogPost.findAll({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  if (!category) throw new HandleError('category does not exist', 404);
  return category;
};