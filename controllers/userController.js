const express = require('express');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
// const userValidation = require('../services/userValidation');

// const secret = process.env.SECRET;
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

module.exports = router;
