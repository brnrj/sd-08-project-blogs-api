const express = require('express');
const usersServices = require('../services/userServ');
const statusCode = require('../utils/statuscode');
// const { User } = require('../../models');
const { validJWT } = require('../middlewares/validateJWT');
const { injectUser } = require('../middlewares/injectUser');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  console.log('req.body post line 11', displayName, email, password, image);

  const isUserValid = await usersServices
    .verifyValidation(displayName, email, password);
  console.log('const isNameValid line 14', isUserValid);
  if (isUserValid.message) {
    return res.status(statusCode.code.c400).json(isUserValid);
  }

  const checkEmail = await usersServices.checkEmail(email);
  console.log('checkEmail', checkEmail);
  if (checkEmail.message) {
    return res.status(statusCode.code.c409).json(checkEmail);
  }

  const createUser = await usersServices.createUser(displayName, email, password, image);
  console.log('createUser', createUser);

  const createToken = await usersServices.createToken(email);

  return res.status(statusCode.code.c201).json({ token: createToken });
});

router.get('/', validJWT, injectUser, async (req, res) => {
  const findAllUser = req.users;
  console.log('findAllUser', findAllUser);
  return res.status(statusCode.code.c200).json(findAllUser);
});

module.exports = router;
