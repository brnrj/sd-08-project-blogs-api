const express = require('express');
const rescue = require('express-rescue');
const Sequelize = require('sequelize');

const { Post, PostCategory } = require('../models');
const { auth, validatePost } = require('../middlewares');
const config = require('../config/config');

const router = express.Router();
const sequelize = new Sequelize(config.development);

router.post('/', auth, validatePost,
  rescue(async (req, res) => {
    const result = await sequelize.transaction(async (t) => {
      const { title, content, categoryIds } = req.body;
      const userId = req.user;

      const post = await Post.create({ title, content, userId }, { transaction: t });
      
      const promises = categoryIds.map(async (categoryId) => PostCategory
          .create({ categoryId, postId: post.id }, { transaction: t }));
      await Promise.all(promises);

      return res.status(201).json(post);
    });
    console.log(result);
  }));

module.exports = router;  