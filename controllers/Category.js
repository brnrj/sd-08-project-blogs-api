const express = require('express');
const { Category } = require('../models');
const { STATUS_201, ERRORS } = require('../utils/dictionary');
const authentication = require('../validations/Auth/authentication');
const nameValidation = require('../validations/Category/nameValidation');

const router = express.Router();

router.post('/',
  nameValidation,
  authentication,
  async (req, res) => {
    const { e500 } = ERRORS;
    const { name } = req.body;

    try {
      const newCategory = await Category.create({ name });
      return res.status(STATUS_201).json(newCategory.dataValues);
    } catch (err) {
      return res.status(e500.status).json({ message: e500.message });
    }
  });

module.exports = router;