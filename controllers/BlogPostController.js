const { Category, BlogPost } = require('../models');

const OK_STATUS = 200;
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
  const categoryNotFound = foundcategories.some((exists) => !exists);
  if (categoryNotFound) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const newBlogPost = await BlogPost.create({
    userId,
    title,
    content,
    published: new Date(),
    updatedAt: new Date(),
  });
  return res.status(OK_STATUS).json(newBlogPost);
};

module.exports = {
  checkPost,
  checkCategoryIds,
  createPost,
};