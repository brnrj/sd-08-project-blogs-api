const { BlogPost, Category, User } = require('../models/index.js');

const isValidBlogPost = (title, content, categoryIds) => {
  if (!title) return '"title" is required';
  if (!content) return '"content" is required';
  if (!categoryIds) return '"categoryIds" is required';
  return undefined;
};

const findAllCat = async (categoryIds) => {
  const findCat = await Category.findAll();
  const catIds = findCat.map((cat) => cat.id);
  const trueCat = categoryIds.every((validCatId) => catIds.includes(validCatId));
  return trueCat;
};

const createBlogPost = async (title, content, categoryIds, userId) => {
  const validBlogPost = isValidBlogPost(title, content, categoryIds);
  
  if (validBlogPost) throw new Error(validBlogPost);

  const findBlogPost = await findAllCat(categoryIds);
  
  if (!findBlogPost) throw new Error('"categoryIds" not found');
  const newBlog = await BlogPost.create({ title, content, userId });

  return newBlog;
};

const findAllPosts = async () => {
  const allPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Category, as: 'categories' },
  ] });
  return allPosts;
};

module.exports = { createBlogPost, findAllPosts };
