const express = require('express');
const rescue = require('express-rescue');
const Sequelize = require('sequelize');

const { User, Post, Category, PostCategory } = require('../models');
const { auth, validatePost, validateCategories, checkPostAndOwner } = require('../middlewares');
const config = require('../config/config');

const router = express.Router();
const sequelize = new Sequelize(config.development);

router.post('/', auth, validatePost, validateCategories,
  rescue(async (req, res) => {
    await sequelize.transaction(async (t) => {
      const { title, content, categoryIds } = req.body;
      const userId = req.user;

      const post = await Post.create({ title, content, userId }, { transaction: t });
      
      const promises = categoryIds.map(async (categoryId) => PostCategory
          .create({ categoryId, postId: post.id }, { transaction: t }));
      await Promise.all(promises);

      return res.status(201).json(post);
    });
}));

router.get('/', auth,
  rescue(async (req, res) => {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(posts);
}));

router.get('/:id', auth, checkPostAndOwner,
  rescue(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(post);
}));

router.put('/:id', auth, validatePost, checkPostAndOwner,
  rescue(async (req, res) => {
    const { id: postId } = req.params;
    const { title, content, categoryIds = 0 } = req.body;

    if (categoryIds) {
      const err = new Error('Categories cannot be edited');
      err.statusCode = 400;
      throw err;
    }

    await Post.update({ title, content }, { where: { id: postId } });

    const post = await Post.findOne({
      where: { id: postId },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });
    
    return res.status(200).json(post);
}));

router.delete('/:id', auth, checkPostAndOwner,
  rescue(async (req, res) => {
    const { id } = req.params;

    await Post.destroy({ where: { id } });
    // console.log(deletedUser);
    
    return res.status(204).send();
}));

module.exports = router;
