const { Router } = require('express');

const LoginController = Router();

const { User } = require('../models');

const { tokenCreate, validlogin } = require('../services');

const STATUS_400 = 400;
const STATUS_200 = 200;

LoginController.post('/', validlogin, tokenCreate, async (req, res) => {
  const { email } = req.body;
  const { token } = req.header.Authorization;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) return res.status(STATUS_200).json({ token });
  res.status(STATUS_400).json({ message: 'Invalid fields' });
});

module.exports = LoginController;
