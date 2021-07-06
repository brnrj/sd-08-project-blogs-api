const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models/index.js');

const validPost = (title, content, categoryIds) => {
  if (!title) return '"title" is required';
  if (!content) return '"content" is required';
  if (!categoryIds) return '"categoryIds" is required';
  return undefined;
};

const findCategory = async (categoryIds) => {
  const findCat = await Category.findAll();
  const catIds = findCat.map((cat) => cat.id);
  const trueCat = categoryIds.every((validCatId) => catIds.includes(validCatId));
  return trueCat;
};

const findId = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = await User.findOne({ where: { email: decoded.email } });
  return id.id;
};

const createPost = async (title, content, categoryIds, userId) => {
  const validBlogPost = validPost(title, content, categoryIds);

  if (validBlogPost) throw new Error(validBlogPost);

  const findBlogPost = await findCategory(categoryIds);
  if (!findBlogPost) throw new Error('"categoryIds" not found');
  const newBlog = await BlogPost.create({ userId, title, content });

  return { id: newBlog.dataValues.id, userId, title, content };
};

const getPosts = async () => {
  const allPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Category, as: 'categories' },
  ] });
  return allPosts;
};

module.exports = { createPost, findId, getPosts };