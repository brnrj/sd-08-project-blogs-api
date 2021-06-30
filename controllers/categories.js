const express = require('express');
const { Category } = require('../models');

const router = express.Router();

const { tokenValidation } = require('../services/user');

const {
  nameValidation,
} = require('../services/categories');

router.get('/', tokenValidation, async (req, res) => {
  const data = await Category.findAll();
  res.status(200).json(data);
});

router.post('/', tokenValidation, async (req, res) => {
  const { name } = req.body;
  const nameValidate = nameValidation(name);
  if (nameValidate) return res.status(400).json({ message: nameValidate });
  const data = await Category.create(name);
  res.status(201).json({ ...data.dataValues, name });
});

module.exports = router;