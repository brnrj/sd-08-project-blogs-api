const express = require('express');

const { User } = require('../models');
const { userDataValidation, tokenValidation } = require('../middlewares');
const tokenGeneration = require('../services/tokenGeneration');
const { userIdFromToken } = require('../services/userIdFromToken');

const router = express.Router();

router.post('/', userDataValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const token = tokenGeneration({ id: user.id, email: user.email });

  return res.status(201).json({ token, user });
});

router.get('/', tokenValidation, async (_req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

router.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
});

router.delete('/me', tokenValidation, async (req, res) => {
  const userId = userIdFromToken(req.headers.authorization);

  await User.destroy({ where: { id: userId } });

  return res.status(204).json({ message: 'User has been deleted' });
});

module.exports = router;
