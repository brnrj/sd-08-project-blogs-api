const express = require('express');

const router = express.Router();
const { getToken, validateLogin } = require('../schema');

const { User } = require('../models');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const invalid = validateLogin(email, password);
  if (invalid) return res.status(invalid.status).json({ message: invalid.message });

  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  if (user.dataValues.password !== password) {
    return res.status(400).json({ message: 'Wrong password' });
  }
  const token = getToken(user);

  return res.status(200).json({ token });
});

module.exports = router;
