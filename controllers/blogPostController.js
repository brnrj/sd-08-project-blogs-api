const jwt = require('jsonwebtoken');
const blogPostService = require('../services/blogPostService');

const { BlogPost, Category, User } = require('../models/index.js');

const findUserId = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await User.findOne({ where: { email: decoded.email } });
  return userId.id;
};

const isCategoryValid = async (categoryIds) => {
  const categoryExists = await Category.findAll();
  const ids = categoryExists.map((category) => category.id);
  const idsAreValid = categoryIds.every((id) => ids.includes(id));
  return idsAreValid;
};

const createPost = async (userId, title, content, categoryIds) => {
  const createNewPost = await BlogPost.create({
    userId,
    title,
    content,
    categoryIds,
    published: new Date(),
    updated: new Date() });
  return createNewPost;
};

const newBlogPost = async (req, res) => {
  try {
    const { authorization: token } = req.headers;
    const userId = await findUserId(token);
    const { title, content, categoryIds } = req.body;
    blogPostService.newBlogPost(title, content, categoryIds);
    // const categoryExists = await Category.findAll();
    // const ids = categoryExists.map((category) => category.id);
    const idsAreValid = await isCategoryValid(categoryIds);
    console.log('o que vem no create:', idsAreValid);
    if (!idsAreValid) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    const createBlogPost = await createPost(userId, title, content, categoryIds);
    // const newPost = await BlogPost.findOne({ where: { title } });
    return res.status(201).json(createBlogPost);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { newBlogPost };
