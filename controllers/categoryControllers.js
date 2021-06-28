const express = require('express');
const { Categories } = require('../models'); 
const { tokenValidation } = require('../middlewares');

const router = express.Router();

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
router.post('/', tokenValidation, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  const category = await Categories.create(name);
  res.status(CREATED).json({ ...category.dataValues, name });
});

router.get('/', tokenValidation, async (_req, res) => {
  const categories = await Categories.findAll();
  res.status(OK).json(categories);
});

module.exports = router;
