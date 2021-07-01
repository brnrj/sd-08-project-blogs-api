const express = require('express');
const blogPostsServices = require('../services/blogPostsServices');

const { validateTitle, validateContent,
  validateCategoryIds, validateCategoryIdsExists } = require('../middlewares/blogPostsValidation');

const { validationToken } = require('../auth/validateJWT');

  const { status, message } = require('../schema/status');

  const routes = express.Router();

routes.post('/', validateTitle, validateContent, validateCategoryIds,
  validateCategoryIdsExists, validationToken, async (req, res) => {
  try {
    const { body, user } = req;
    console.log(body, 'teste', user);
    const createdBlogPost = await blogPostsServices.createBlogPosts(body, user);
    return res.status(status.created).json(createdBlogPost);
  } catch (err) {
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

routes.get('/', validationToken, async (_req, res) => {
  try {
    const posts = await blogPostsServices.findAllPosts();
    return res.status(status.OK).json(posts);
  } catch (err) {
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

routes.get('/:id', validationToken, async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await blogPostsServices.findPostById(id);
    if (postById.isError) {
      return res.status(status.notFound).json({ message: message.postNotExist });
    }
    return res.status(status.OK).json(postById);
  } catch (err) {
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
