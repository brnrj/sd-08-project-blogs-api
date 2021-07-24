const { Router } = require('express');

const userController = Router();

const { User } = require('../models');
const { status, message } = require('../services/statusMessages');

userController.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

userController.get('/', async (req, res) => {
  try {
    const result = await User.findAll();
    console.log(result);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = userController;