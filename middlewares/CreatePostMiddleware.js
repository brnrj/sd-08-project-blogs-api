const { Op } = require('sequelize');
const { Category, BlogPost } = require('../models');

const getEmptyField = (fields) => {
  const emptyField = Object.keys(fields).find((field) => !fields[field]);

  return emptyField;
};

const CreatePostMiddleware = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const emptyField = getEmptyField({ title, content, categoryIds });
  if (emptyField) return res.status(400).json({ message: `"${emptyField}" is required` });
  const categories = await Category.findAll({
    where: { id: { [Op.in]: categoryIds } },
  });
  if (categories.length !== categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  const now = new Date();
  const categString = JSON.stringify(categoryIds);
  const { id: userId } = req.userInfo.data;
  const createdBP = await BlogPost.create(
    { title, content, userId, categoryIds: categString, published: now, updated: now },
  );
  return res.status(201).json({
    id: createdBP.id, userId, title, content,
  });
};

module.exports = CreatePostMiddleware;