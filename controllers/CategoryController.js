const express = require('express');
const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const router = express.Router();

const httpRequestSubmit = 201;
const httpRequestErr = 401;
const httpRequestErro = 400;

router.post('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) res.status(httpRequestErr).json({ message: 'Token not found' });

  const { name } = req.body;

  if (!name) res.status(httpRequestErro).json({ message: '"name" is required' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
    const category = await Category.create({ name });
    res.status(httpRequestSubmit).json(category);
  });
});

module.exports = router;
