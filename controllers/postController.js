const { Router } = require('express');

const BlogPosts = require('../models');
const Users = require('../models');
const { validateToken } = require('../auth/token');
const { 
  postValidation,
  categoryValidation,
} = require('../middlewares/postValidation');

const router = new Router();

// Criar post
router.post('/', validateToken, postValidation, categoryValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;

  const user = await Users.findOne({ where: { email } });

  const userId = user.dataValues.id;

  const post = await BlogPosts.create({ userId, title, content, categoryIds });

  return res.status(201).json(post);
});

module.exports = router;
