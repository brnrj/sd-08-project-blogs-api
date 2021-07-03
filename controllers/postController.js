const express = require('express');
const { BlogPost } = require('../models');

const router = express.Router();

const { auth } = require('../middlewares/authorization');
const { validateBody, validateCategoryIds } = require('../middlewares/posts');

const created = 201;
const internalServerError = 500;

// Este endpoint usa o método create do Sequelize para salvar um BlogPost no banco.
router.post('/', auth, validateBody, validateCategoryIds, async (req, res) => {
  const { title, content } = req.body;
  const reqUserId = req.user; // req.user = payload;
  const userId = reqUserId.id;
  // console.log(userId, "User ID");
    
  try {
    const newBlogPost = await BlogPost.create({ title, content, userId });

    return res.status(created).json(newBlogPost);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;