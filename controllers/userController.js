const { Router } = require('express');

const { Users } = require('../models');
const { userValidation } = require('../middlewares/userValidation');
const { createToken, validateToken } = require('../auth/token');

const router = new Router();

// Criar usuário
router.post('/', userValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await Users.create({ displayName, email, password, image });

  const token = createToken(email);

  return res.status(201).json({ token });
});

// Listar todos os usuários
router.get('/', validateToken, async (_req, res) => {
  const users = await Users.findAll({});

  return res.status(200).json(users);
});

// Listar usuário por ID
router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
});

// Deletar usuário por email
router.delete('/me', validateToken, async (req, res) => {
  const { email } = req.user;

  await Users.destroy({ where: { email } });

  return res.status(204).json({});
});

module.exports = router;
