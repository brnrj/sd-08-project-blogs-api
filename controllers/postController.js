const { Router } = require('express');

const { BlogPosts } = require('../models');
const { Users } = require('../models');
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

// Deletar o post do usuário pelo id
router.delete('/:id', validateToken, async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  const user = await Users.findOne({ where: { email } });

  const userId = user.dataValues.id;

  const post = await BlogPosts.findOne({
    include: { model: Users, as: 'users', attributes: { exclude: 'password' } },
    where: { id },
  });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await BlogPosts.destroy({ where: { userId, id } });

  return res.status(204).json();
});

module.exports = router;
