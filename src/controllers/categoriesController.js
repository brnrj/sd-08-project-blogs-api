const express = require('express');

const { Categories } = require('../models');
const { tokenValidation } = require('../middlewares');

const router = express.Router();

router.post('/', tokenValidation, async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  const newCategory = await Categories.create({ name });

  return res.status(201).json(newCategory);
});

router.get('/', tokenValidation, async (_req, res) => {
  const categories = await Categories.findAll();

  return res.status(200).json(categories);
});

module.exports = router;
