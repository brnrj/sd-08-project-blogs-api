const express = require('express');
const { User } = require('../models');
const createJWT = require('../services/createJWT');

const {
  emailValidation,
  passwordValidation,
} = require('../middlewares/loginValidations');

const router = express.Router();

router.post(
  '/', 
  emailValidation,
  passwordValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email, password } });
      if (!user) return res.status(400).json({ message: 'Invalid fields' });
      const token = createJWT(user);
      res.status(200).json({ token });
    } catch (error) {
      return error;
    }
  },
);

module.exports = router;
