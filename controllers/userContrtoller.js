const express = require('express');
const { User } = require('../models');
const { userValidation, checkToken } = require('../middlewares');

const ok = 200;
const creationSuccess = 201;
const conflictError = 409;
const serverError = 500;
const searchError = 404;

const router = express.Router();

router.post('/', userValidation, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(conflictError).json({ message: 'User already registered' });
    }
    await User.create(req.body);
    res.status(creationSuccess).json({ token: 'token' });
  } catch (error) {
    res.status(serverError).json({ message: error.message });
  }
});

router.get('/', checkToken, async (req, res) => {
  const users = await User.findAll();
  res.status(ok).json(users);
});

router.get('/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(searchError).json({ message: 'User does not exist' });
  }
  res.status(ok).json(user);
});

module.exports = router;
