const express = require('express');
const { Categories } = require('../models');
const { checkToken } = require('../middlewares');
const ok = 200;
const creationSuccess = 201;
const requestError = 400;

const router = express.Router();


router.post('/', checkToken, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(requestError).json({ message: '"name" is required' });
  }
  const category = await Categories.create(name);
  res.status(creationSuccess).json({ ...category.dataValues, name });
});

router.get('/', checkToken, async (req, res) => {
  const categories = await Categories.findAll();
  res.status(ok).json(categories);
});

module.exports = router;
