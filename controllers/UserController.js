const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ErrorsUser, ErrorsUserDelete } = require('../schemas');

const router = express.Router();

const httpResOk = 200;
const httpResSubmit = 201;
const httpResDelete = 204;
const httpResError = 500;
const httpResErr = 401;
const httpResErro = 404;
const httpResConflict = 409;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) {
      res.status(httpResErr).json({ message: 'Expired or invalid token' });
      return;
    }
    const users = await User.findAll();
    res.status(httpResOk).json(users);
  });
});

router.get('/:id', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) {
      res.status(httpResErr).json({ message: 'Expired or invalid token' }); return;
    }
    const user = await User.findByPk(id);
    if (!user) { res.status(httpResErro).json({ message: 'User does not exist' }); return; }
    res.status(httpResOk).json(user);
  });
});

router.post('/', ErrorsUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) {
    res.status(httpResConflict).json({ message: 'User already registered' }); return;
  }

  try {
    const user = await User.create({ displayName, email, password, image });
    res.status(httpResSubmit).json(user);
    return;
  } catch (err) {
    console.log(err.message);
    res.status(httpResError).json({ message: 'Something went wrong' });
  }
});

router.delete('/me', ErrorsUserDelete, async (req, res) => {
  const email = await User.findByPk(req.user.email);
  await User.destroy({ where: { email } });
  res.status(httpResDelete).end();
});

module.exports = router;
