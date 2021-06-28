const express = require('express');
const { User } = require('../models');
const createJWT = require('../services/createJWT');

const {
  emailValidation,
  passwordValidation,
} = require('../services/login');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailValidate = emailValidation(email);
    if (emailValidate) return res.status(400).json({ message: emailValidate });
    const passwordValidate = passwordValidation(password);
    if (passwordValidate) return res.status(400).json({ message: passwordValidate });
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(400).json({ message: 'Invalid fields' });
    const token = createJWT(user);
    res.status(200).json({ token });
  } catch (error) {
    return error;
  }
});

module.exports = router;
