const express = require('express');
const { loginValidation, checkUser, generateToken } = require('../middlewares');

const router = express.Router();

const ok = 200;

router.post('/', loginValidation, checkUser, generateToken, async (req, res) => {
  const { token } = req;
  res.status(ok).json({ token });
});

module.exports = router;
