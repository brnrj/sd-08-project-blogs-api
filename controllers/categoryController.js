const express = require('express');
const rescue = require('express-rescue');

const { Category } = require('../models');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/', auth,
  rescue(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      const err = new Error('"name" is required');
      err.statusCode = 400;
      throw err;
    }
    const category = await Category.create({ name });
    
    return res.status(201).json(category);
  }));

  router.get('/', auth,
  rescue(async (_req, res) => {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  }));

module.exports = router;