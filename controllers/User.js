const express = require('express');
const { User } = require('../models');
const { STATUS_201, ERRORS, STATUS_200 } = require('../utils/dictionary');
const { token } = require('../utils/tokenGenerator');
const invalidLoginValidation = require('../validations/Login/invalidLoginValidation');
const loginValidationMiddleware = require('../validations/Login/loginValidationMiddleware');
const FieldsValidationsMiddleware = require('../validations/Register/fieldsValidationsMiddleware');
const ValidationsMiddleware = require('../validations/Register/validationsMiddleware');

const router = express.Router();

router.post('/',
  FieldsValidationsMiddleware,
  ValidationsMiddleware,
  async (req, res) => {
    const { eUserRegistered } = ERRORS;
    const { displayName, email, password, image } = req.body;

    User.create({ displayName, email, password, image })
      .then((_data) => res.status(STATUS_201).json({ token: token(email, password) }))
      .catch((_err) => res.status(eUserRegistered.status)
        .json({ message: eUserRegistered.message }));
  });

router.post('/login',
  loginValidationMiddleware,
  invalidLoginValidation,
  async (req, res) => {
    const { email, password } = req.body;
    return res.status(STATUS_200).json({ token: token(email, password) });
  });

module.exports = router;