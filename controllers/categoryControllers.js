const express = require('express');
const { Categories } = require('../models'); 
const { tokenValidation } = require('../middlewares');

const router = express.Router();

const BAD_REQUEST = 400;
const CREATED = 201;
router.post('/', tokenValidation, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  const category = await Categories.create(name);
  res.status(CREATED).json({ ...category.dataValues, name });
});

module.exports = router;
