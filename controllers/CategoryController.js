const express = require('express');
const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const router = express.Router();

const httpResOk = 200;
const httpResSubmit = 201;
const httpResErr = 401;
const httpResErro = 400;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) {
      res.status(httpResErr).json({ message: 'Expired or invalid token' });
      return;
    }
    const category = await Category.findAll();
    res.status(httpResOk).json(category);
  });
});

router.post('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  const { name } = req.body;

  if (!name) { res.status(httpResErro).json({ message: '"name" is required' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) {
      res.status(httpResErr).json({ message: 'Expired or invalid token' }); return;
    }
    const category = await Category.create({ name });
    res.status(httpResSubmit).json(category);
  });
});

module.exports = router;
