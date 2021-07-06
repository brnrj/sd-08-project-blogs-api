const express = require('express');
const jwt = require('jsonwebtoken');
const authenticator = require('../middlewares/authenticator');
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
const OK = 200;
const NOT_FOUND = 404;

router.post('/', userValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return res.status(CONFLICT).send({ message: 'User already registered' });
  await Users.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  res.status(CREATED).send({ token });
});

router.get('/', authenticator, async (_req, res) => {
    const users = await Users.findAll();
    return res.status(OK).json(users);
});

router.get('/:id', authenticator, async (req, res) => {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) return res.status(NOT_FOUND).send({ message: 'User does not exist' });
    return res.status(OK).json(user);
});

module.exports = router;
