const express = require('express');
const { BlogPost, User } = require('../models');
const { STATUS_201, ERRORS } = require('../utils/dictionary');
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
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const userData = decoded(authorization);
    const userEmail = userData.user.email;

    try {
      const user = await User.findOne({ where: { email: userEmail } });
      const userId = await user.dataValues.id;
      console.log(userId);
      const newPost = await BlogPost.create({ title, content, userId });
      return res.status(STATUS_201).json(newPost.dataValues);
    } catch (err) {
      return res.status(e500.status).json({ message: e500.message });
    }
  });

  router.get('/', authentication, async (_req, _res) => {

  });

module.exports = router;