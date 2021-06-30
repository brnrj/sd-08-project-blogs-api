const express = require('express');
const { validateLogin } = require('../middlewares/userValidations');
const { tokenGenerator } = require('../utils/token');

const router = express.Router();
router.post('/', validateLogin, (req, res) => {
  const { user } = res.locals;
  const { password: _, ...UserWithoutPassword } = user;
  const token = tokenGenerator(UserWithoutPassword);
  res.locals.token = token;
  res.status(200).json({ token });
});

module.exports = router;