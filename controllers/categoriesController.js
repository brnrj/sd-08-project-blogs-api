const express = require('express');
const authenticator = require('../middlewares/authenticator');
const { Categories } = require('../models');

const router = express.Router();

const BAD_REQUEST = 400;
const CREATED = 201;

router.post('/', authenticator, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).send({ message: '"name" is required' });
  const category = await Categories.create({ name });
  res.status(CREATED).json(category);
});

module.exports = router;
