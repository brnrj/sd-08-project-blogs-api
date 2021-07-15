const express = require('express');
const { Users } = require('../models');
const { validate, getToken } = require('../schema');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const invalid = validate(displayName, email, password);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });

    const emailExists = await Users.findOne({ where: { email } });
    if (emailExists && emailExists.dataValues) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await Users.create({ displayName, email, password, image });
    const token = getToken(newUser);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', validateJWT, async (req, res) => {
  const users = await Users.findAll();
  if (!users) res.status(401).json({ message: 'Algo deu errado' });

  return res.status(200).json(users);
});

module.exports = router;
