const express = require('express');
const jwt = require('jsonwebtoken');
const loginValidation = require('../middlewares/loginValidation');
const { Users } = require('../models');

const secret = 'secret';
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const router = express.Router();

const BAD_REQUEST = 400;
const OK = 200;

router.post('/', loginValidation, async (req, res) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  res.status(OK).send({ token });
});

module.exports = router;
