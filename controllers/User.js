const express = require('express');
const { User } = require('../models');
const { STATUS_201, ERRORS, STATUS_200 } = require('../utils/dictionary');
const { token } = require('../utils/token');
const FieldsValidationsMiddleware = require('../validations/Register/fieldsValidationsMiddleware');
const ValidationsMiddleware = require('../validations/Register/validationsMiddleware');
const authentication = require('../validations/Auth/authentication');

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

router.get('/', authentication, async (_req, res) => {
  const { e500 } = ERRORS;
  try {
    const allUsers = await User.findAll();
    return res.status(STATUS_200).json(allUsers);
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
});

module.exports = router;