const express = require('express');
const { User } = require('../models');
const { STATUS_201, ERRORS } = require('../utils/dictionary');
const { token } = require('../utils/tokenGenerator');
const userFieldsValidationsMiddleware = require('../validations/User/fieldsValidationsMiddleware');
const userValidationsMiddleware = require('../validations/User/validationsMiddleware');

const router = express.Router();

router.post('/',
  userFieldsValidationsMiddleware,
  userValidationsMiddleware,
  async (req, res) => {
    const { eUserRegistered } = ERRORS;
    const { displayName, email, password, image } = req.body;
    console.log('3');
    User.create({ displayName, email, password, image })
      .then((_data) => res.status(STATUS_201).json({ token: token(email, password) }))
      .catch((_err) => res.status(eUserRegistered.status)
        .json({ message: eUserRegistered.message }));
  });

module.exports = router;