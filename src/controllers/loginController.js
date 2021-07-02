const express = require('express');

const { loginDataValidation } = require('../middlewares');
const tokenGeneration = require('../services/tokenGeneration');

const router = express.Router();

router.post('/', loginDataValidation, async (req, res) => {
  const { email, id } = req.body;

  const token = tokenGeneration({ id, email });

  return res.status(200).json({ token });
});

module.exports = router;

module.exports = router;
