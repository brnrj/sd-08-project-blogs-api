const express = require('express');
const { Users } = require('../models');
const { validate, getToken } = require('../schema');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const invalid = validate(displayName, email, password);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });

    const newUser = await Users.create({ displayName, email, password, image });

    const token = getToken(newUser);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
