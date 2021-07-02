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

const getById = async (req, res, next) => {
  const { id } = req.params;
  const service = await ServiceBlogPost.getPostById(id);
  console.log(service);
  if (!service.post) return next(service);
  return res.status(code.ok).json(service.post); 
};

const postUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { id: userId } = req.payload;
  const service = await ServiceBlogPost.updatePost(body, id, userId);
  if (!service.post) return next(service);
  return res.status(code.ok).json(service.post);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.payload;
  const service = await ServiceBlogPost.deletePost({ id, userId });
  if (service.err) return next(service);
  return res.status(code.notContent).json();
};

const search = async (req, res, next) => {
  const { query } = req;
  const service = await ServiceBlogPost.searchPost(query);
  if (!Array.isArray(service)) {
    return next(service);
  }
  return res.status(code.ok).json(service);
};

module.exports = {
  addPost,
  getAll,
  getById,
  postUpdate,
  deletePost,
  search,
};
