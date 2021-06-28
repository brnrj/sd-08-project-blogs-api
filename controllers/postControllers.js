const express = require('express');
const { postValidation, categoryValidation } = require('../middlewares');
const { getToken } = require('../middlewares/auth');
const { BlogPost } = require('../models');

const router = express.Router();

const CREATED = 201;

router.post('/', getToken, postValidation, categoryValidation, async (req, res) => {
  const post = await BlogPost.create(req.body);
  res.status(CREATED).json(post);
});

module.exports = router;
