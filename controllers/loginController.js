const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');
const loginValidation = require('../services/loginValidation');

const { secret } = config.development;
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const validation = loginValidation.validation(email, password);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const user = await User.findOne({
    where: { email },
  });
  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { id: user.id, email } }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = router;
