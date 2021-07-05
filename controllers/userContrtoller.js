const express = require('express');
const { User } = require('../models');
const { userValidation } = require('../middlewares');

const creationSuccess = 201;
const conflictError = 409;
const serverError = 500;

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

module.exports = router;
