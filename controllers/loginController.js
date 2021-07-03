const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models');

const router = express.Router();

const { validateLogin } = require('../middlewares/login');

const ok = 200;
const badRequest = 400;
const unauthorized = 401;

const JWT_SECRET = 'meuSegredoSuperSecreto';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  if (!email) { 
    return res.status(badRequest).json({ message: '"email" is required' }); 
  }

  if (!password) { 
    return res.status(badRequest).json({ message: '"password" is required' }); 
  }

  const userEmail = await User.findOne({ where: { email } });
  if (!userEmail) return res.status(badRequest).json({ message: 'Invalid fields' });

  try {
    const user = await User.findOne({ where: { email } });
    // console.log(user.dataValues.email, "User");
  
    const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email },
      JWT_SECRET,
      jwtConfig);
    // console.log(token, "Token");

    res.status(ok).json({ token });
  } catch (error) {
    res.status(unauthorized).json({ message: 'Incorrect username or password' });
  }
});

module.exports = router;