const { Router } = require('express');

const blogPostRouter = Router();

const service = require('../services');
const { BlogPost, PostsCategories } = require('../models');
const { status, message } = require('../services/statusMessages');

blogPostRouter.get('/:id', service.auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogPost.findByPk(id);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

blogPostRouter.get('/', service.auth, async (req, res) => {
  try {
    const result = await BlogPost.findAll();
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

blogPostRouter.post('/', service.auth, service.blogPostCheck, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { title, content, categoryIds } = req.body;
    // console.log(userId, title, content, categoryIds);
    const addPost = await BlogPost.create(
      { title, content, userId, published: new Date(), updated: new Date() },
    );
    
    await categoryIds.forEach(async (elId) => {
      await PostsCategories.create({ categoryId: elId, postId: addPost.id });
    });
    console.log('Ponto 3');
    console.log(addPost);
    res.status(status.CREATED).json(addPost);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = blogPostRouter;