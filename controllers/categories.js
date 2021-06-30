const express = require('express');
const { Category } = require('../models');
// const createJWT = require('../services/createJWT');

const router = express.Router();

const { tokenValidation } = require('../services/user');

const {
  nameValidation,
} = require('../services/categories');

router.post('/', tokenValidation, async (req, res) => {
  const { name } = req.body;
  const nameValidate = nameValidation(name);
  if (nameValidate) return res.status(400).json({ message: nameValidate });
  const data = await Category.create(name);
  res.status(201).json({ ...data.dataValues, name });
});

module.exports = router;