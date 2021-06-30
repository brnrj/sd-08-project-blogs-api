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

router.get('/:id', authentication, async (req, res) => {
  const { e500, eUserNotFound } = ERRORS;
  const { id } = req.params;
  const inputId = +id;

  try {
    const user = await User.findOne({ where: { id: inputId } });
    if (user === null) {
      return res.status(eUserNotFound.status).json({ message: eUserNotFound.message });
    }
    return res.status(STATUS_200).json(user.dataValues);
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
});

module.exports = router;