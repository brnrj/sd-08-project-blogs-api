const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const httpResOk = 200;
const httpResError = 400;

const JwtSecret = 'secret';
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email },
      JwtSecret, jwtConfig);

    res.status(httpResOk).json({ token });
    return;
  } catch (error) {
    res.status(httpResError).json({ message: 'Invalid fields' });
  }
});

module.exports = router;
