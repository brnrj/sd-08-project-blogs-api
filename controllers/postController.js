const express = require('express');
const { User, Categorie, BlogPost } = require('../models');

const router = express.Router();

const { auth } = require('../middlewares/authorization');
const { validateBody, validateCategoryIds } = require('../middlewares/posts');

const ok = 200;
const created = 201;
const internalServerError = 500;

// Este endpoint usa o método findAll do Sequelize para retorno todos os posts.
router.get('/', auth, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User, as: 'user', attributes: { exclude: ['password'] },
        },
        {
          model: Categorie, as: 'categories', through: { attributes: [] },
        },
      ],
    });

    return res.status(ok).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método create do Sequelize para salvar um BlogPost no banco.
router.post('/', auth, validateBody, validateCategoryIds, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const reqUserId = req.user; // req.user = payload;
  const userId = reqUserId.id;
  // console.log(userId, "User ID");
    
  try {
    const newBlogPost = await BlogPost.create({ title, content, userId, categoryIds });

    return res.status(created).json(newBlogPost);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;