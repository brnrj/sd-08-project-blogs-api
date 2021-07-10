const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ErrorsUser } = require('../schemas');

const router = express.Router();

const httpRequestOk = 200;
const httpRequestSubmit = 201;
const httpRequestError = 500;
const httpRequestErr = 401;
const httpRequestErro = 404;
const httpRequestConflict = 409;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
    const users = await User.findAll();
    res.status(httpRequestOk).json(users);
  });
});

router.get('/:id', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
    const user = await User.findByPk(id);
    if (!user) return res.status(httpRequestErro).json({ message: 'User does not exist' });
    res.status(httpRequestOk).json(user);
  });
});

router.post('/', ErrorsUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) {
    return res.status(httpRequestConflict).json({ message: 'User already registered' });
  }

  try {
    const user = await User.create({ displayName, email, password, image });
    return res.status(httpRequestSubmit).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(httpRequestError).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
