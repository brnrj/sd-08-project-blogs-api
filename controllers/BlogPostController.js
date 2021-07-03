const { Category, BlogPost, PostsCategories } = require('../models');

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
  const categoriesList = await Category.findAll();
  const allCategoriesIds = categoriesList.map((category) => category.id);
  const categoriesExist = categoryIds.every((id) => allCategoriesIds.includes(id));
  if (!categoriesExist) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  try {
    const newBlogPost = await BlogPost.create({
      userId,
      title,
      content,
      published: new Date(),
      updated: new Date(),
    });
    const { id } = newBlogPost.dataValues;
    await categoryIds.forEach((catId) => PostsCategories.create({ categoryId: catId, postId: id }));
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