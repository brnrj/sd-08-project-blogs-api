const express = require('express');
const { Category } = require('../models');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.errors[0].message })
  }
});

router.get('/', validateJWT, async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json(categories);
});

module.exports = router;
