const express = require('express');
const { BlogPost, User, Category } = require('../models');

const router = express.Router();

const {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  categoryValidation,
} = require('../middlewares/postsValidations');

const tokenValidation = require('../middlewares/tokenValidation');

router.get(
  '/',
  tokenValidation,
  async (req, res) => {
    const response = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' }, 
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    res.status(200).json(response);
  },
);

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