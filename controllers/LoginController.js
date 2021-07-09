const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const httpRequestOk = 200;
const httpRequestError = 400;

const JwtSecret = 'secret';
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email },
      JwtSecret, jwtConfig);

    res.status(httpRequestOk).json({ token });
  } catch (error) {
    res.status(httpRequestError).json({ message: 'Invalid fields' });
  }
});

module.exports = router; 