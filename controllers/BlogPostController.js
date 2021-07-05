const { Category, BlogPost, PostsCategories, User } = require('../models');

const OK_STATUS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

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

const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    console.log(posts);
    return res.status(OK_STATUS).json(posts);
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { excludes: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  console.log('post: ', post);
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  return res.status(OK_STATUS).json(post.dataValues);
};

module.exports = {
  checkPost,
  checkCategoryIds,
  createPost,
  getAllPosts,
  getPostById,
};