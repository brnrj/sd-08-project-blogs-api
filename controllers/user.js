const express = require('express');
const { User } = require('../models');
const createJWT = require('../services/createJWT');

const router = express.Router();
const { 
  userValidation,
  tokenValidation,
} = require('../services/user');

router.get('/', tokenValidation, async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.post('/', userValidation, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(409).json({ message: 'User already registered' });
    const data = await User.create(req.body);
    const token = createJWT(data);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;