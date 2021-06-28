const express = require('express');
const { loginValidation, userRegistred } = require('../middlewares');
const { createToken } = require('../middlewares/auth');

const router = express.Router();

const OK = 200;

router.post('/', loginValidation, userRegistred, createToken, async (req, res) => {
  const { token } = req;
  res.status(OK).json({ token });
});

module.exports = router;