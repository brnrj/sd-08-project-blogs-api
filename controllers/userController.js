const express = require('express');
const { User } = require('../models');
const { validate, getToken } = require('../schema');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const invalid = validate(displayName, email, password);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists && emailExists.dataValues) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await User.create({ displayName, email, password, image });
    const token = getToken(newUser);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', validateJWT, async (req, res) => {
  const users = await User.findAll();
  if (!users) res.status(401).json({ message: 'Algo deu errado' });

  return res.status(200).json(users);
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.delete('/me', validateJWT, async (req, res) => {
  try {
    const { id } = req.user.data;

    await User.destroy(
      { where: { id } },
    );

    return res.status(204).json();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
