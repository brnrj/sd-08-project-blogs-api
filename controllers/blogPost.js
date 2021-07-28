const { Router } = require('express');

const blogPostRouter = Router();

const service = require('../services');
const { BlogPost } = require('../models');
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

// blogPostRouter.post('/', async (req, res) => {
//   try {
    
//   } catch (error) {
//     res.status(status.SERVER_ERROR).json(message.serverError);
//   }
// });

module.exports = blogPostRouter;