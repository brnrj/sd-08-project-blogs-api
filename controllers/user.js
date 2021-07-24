const { Router } = require('express');

const userRouter = Router();

const { User } = require('../models');
const service = require('../services');

const { status, message } = service;

userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const result = await User.findAll();
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = userRouter;