const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const loginValidation = require('../services/loginValidation');

const secret = process.env.SECRET;
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const validation = loginValidation.validation(email, password);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const verifyIfExists = await User.findOne({
    where: { email },
  });
  if (!verifyIfExists) return res.status(400).json({ message: 'Invalid fields' });

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = router;
