const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const userValidation = require('../services/userValidation');
const tokenValidation = require('../middlewares/tokenAuth');

const secret = process.env.SECRET;
const router = express.Router();

router.post('/', async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const validation = userValidation.validation(displayName, email, password);
    if (validation) return res.status(validation.code).json({ message: validation.message });

    const verifyIfExists = await User.findOne({ where: { email } });
    if (verifyIfExists) return res.status(409).json({ message: 'User already registered' });

    await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: email }, secret, jwtConfig);

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

module.exports = router;
