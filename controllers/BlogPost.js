const express = require('express');
const { BlogPost, User, Category, PostCategory } = require('../models');
const { STATUS_201, ERRORS, STATUS_200 } = require('../utils/dictionary');
const { decoded } = require('../utils/token');
const authentication = require('../validations/Auth/authentication');
const postValidation = require('../validations/BlogPost/postValidation');
const validationCategory = require('../validations/BlogPost/validationCategory');

const router = express.Router();

router.post('/',
  authentication,
  postValidation,
  validationCategory,
  async (req, res) => {
    const { e500 } = ERRORS;
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const userData = decoded(authorization);
    const userEmail = userData.user.email;

    try {
      const user = await User.findOne({ where: { email: userEmail } });
      const userId = await user.dataValues.id;
      const newPost = await BlogPost.create({ title, content, userId });
      const newPostId = await newPost.dataValues.id;

      await (categoryIds.map(async (id) => PostCategory && PostCategory.create({ newPostId, id })));

      return res.status(STATUS_201).json(newPost.dataValues);
    } catch (err) {
      return res.status(e500.status).json({ message: e500.message });
    }
  });

  router.get('/', authentication, async (_req, res) => {
    const { e500 } = ERRORS;
    try {
      const allPosts = await BlogPost.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'displayName', 'email', 'image'],
          },
          {
            model: Category,
            as: 'categories',
            attributes: ['id', 'name'],
          }] });
      return res.status(STATUS_200).json(allPosts);
    } catch (err) {
      return res.status(e500.status).json({ message: e500.message });
    }
  });

module.exports = router;