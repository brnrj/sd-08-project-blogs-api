const ServiceBlogPost = require('../services/serviceBlogPost');
const code = require('../utils/code');

const addPost = async (req, res, next) => {
  const { content, title, categoryIds } = req.body;
  const { id: userId } = req.payload;
  const service = await ServiceBlogPost.addPost(
    { userId: Number(userId), content, title, categoryIds },
  );
  if (!service.blogPost) return next(service);
  return res.status(code.created).json(service.blogPost);
};

const getAll = async (req, res, next) => {
  const service = await ServiceBlogPost.getAllPost();
  if (!service.post) return next(service);
  res.status(code.ok).json(service.post);
};

module.exports = {
  addPost,
  getAll,
};
