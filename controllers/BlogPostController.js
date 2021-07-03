const { Category, BlogPost } = require('../models');

const CREATED = 201;
const BAD_REQUEST = 400;

const checkPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }
  next();
};

const checkCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const foundcategories = categoryIds.map((id) => Category.findByPk(id).then((data) => data));
  console.log('found categories: ', foundcategories);
  const categoryNotFound = foundcategories.some((exists) => !exists);
  if (categoryNotFound) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  console.log('userId: ', userId);
  try {
    const newBlogPost = await BlogPost.create({
      userId,
      title,
      content,
      published: new Date(),
      updated: new Date(),
    });
    console.log('newBlogPost: ', newBlogPost);
    const { id } = newBlogPost.dataValues;
    return res.status(CREATED).json({ id, userId, title, content });
  } catch (error) {
    console.log('erro ao criar post: ', error);
  }
};

module.exports = {
  checkPost,
  checkCategoryIds,
  createPost,
};