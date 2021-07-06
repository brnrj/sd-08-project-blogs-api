const express = require('express');
const jwt = require('jsonwebtoken');
const userValidation = require('../middlewares/userValidation');
const { Users } = require('../models');

const secret = 'secret';
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const router = express.Router();

const CONFLICT = 409;
const CREATED = 201;

router.post('/', userValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return res.status(CONFLICT).send({ message: 'User already registered' });
  await Users.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  res.status(CREATED).send({ token });
});

module.exports = router;
