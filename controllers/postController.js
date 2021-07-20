const PostService = require('../services/postService');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  try {
    const { statusCode, post } = await PostService.create(token, title, content, categoryIds);
    res.status(statusCode).json(post);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const { statusCode, posts } = await PostService.getAll();
    res.status(statusCode).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { statusCode, posts } = await PostService.getById(id);
    res.status(statusCode).json(posts);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  try {
    const { statusCode, postUpdated } = await PostService
      .update(token, id, { title, content, categoryIds });
    res.status(statusCode).json(postUpdated);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  try {
    await PostService.destroy(token, id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const { q } = req.query;
  
  let result = null;

  try {
    if (!q) {
      const { posts } = await PostService.getAll();
      result = posts;
    } else {
      result = await PostService.search(q);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  search,
};
