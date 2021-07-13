const express = require('express');
const { Categories } = require('../../models');
const verifyToken = require('../jwtValidation');
const nameValid = require('./categoriesValidation');

const categoriesRouter = express.Router();

categoriesRouter.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;

  const validation = nameValid(name);
  if (validation) {
    const { erro } = validation;
    return res.status(erro.code).json({
      message: erro.message,
    });
  }

  const addCategories = await Categories.create({ name });

  return res.status(201).json(addCategories);
});

module.exports = categoriesRouter;