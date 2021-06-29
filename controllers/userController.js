const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');
const userValidation = require('../services/userValidation');
const tokenValidation = require('../middlewares/tokenAuth');
const { userIdFromToken } = require('../services/userIdFromToken');

const { secret } = config.development;
const router = express.Router();

router.post('/', async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const validation = userValidation.validation(displayName, email, password);
    if (validation) return res.status(validation.code).json({ message: validation.message });

    const verifyIfExists = await User.findOne({ where: { email } });
    if (verifyIfExists) return res.status(409).json({ message: 'User already registered' });

    const user = await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(201).json({ token });
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

  return res.status(204).json();
});

module.exports = router;
