const { Router } = require('express');

const categoryRouter = Router();

const service = require('../services');
const { Category } = require('../models');
const { status, message } = require('../services/statusMessages');

categoryRouter.get('/:id', service.auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByPk(id);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

categoryRouter.get('/', service.auth, async (req, res) => {
  try {
    const result = await Category.findAll();
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

// categoryRouter.post('/', async (req, res) => {
//   try {
    
//   } catch (error) {
//     res.status(status.SERVER_ERROR).json(message.serverError);
//   }
// });

module.exports = categoryRouter;