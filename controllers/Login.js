const express = require('express');
const { STATUS_200 } = require('../utils/dictionary');
const { token } = require('../utils/tokenGenerator');
const invalidLoginValidation = require('../validations/Login/invalidLoginValidation');
const loginValidationMiddleware = require('../validations/Login/loginValidationMiddleware');

const router = express.Router();

router.post('/',
  loginValidationMiddleware,
  invalidLoginValidation,
  async (req, res) => {
    const { email, password } = req.body;
    return res.status(STATUS_200).json({ token: token(email, password) });
  });

module.exports = router;
