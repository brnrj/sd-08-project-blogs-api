const express = require('express');
const { BlogPost } = require('../models');

const router = express.Router();

const {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  categoryValidation,
} = require('../middlewares/postsValidations');

const { tokenValidation } = require('../services/user');

router.post(
  '/',
  tokenValidation,
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  categoryValidation,
  async (req, res) => {
    const { body, user: { dataValues: userData } } = req;
    const { title, categoryIds, ...details } = body;
    const data = await BlogPost.create({
      ...details,
      userId: userData.id,
      published: new Date(),
      updated: new Date(),
    });
    res.status(201).json({
      id: data.dataValues.id,
      userId: data.dataValues.userId,
      title,
      content: data.dataValues.content,
    });
  },
);

module.exports = router;