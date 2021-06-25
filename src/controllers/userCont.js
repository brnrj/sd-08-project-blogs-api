const express = require('express');
const usersServices = require('../services/userServ');
const statusCode = require('../utils/statuscode');
const { user } = require('../../models');

const router = express.Router();

// const code = {
//   code201: 201,
//   code400: 400,
//   code409: 409,
// };

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  console.log('req.body post line 11', displayName, email, password, image);

  const findAllUser = await user.findAll()
    .then((users) => users)
    .catch((err) => {
      console.log(err.message);
      return { message: 'Algo deu errado' };
  });
  // const checkEmail = await usersServices.checkEmail(email);
  // if (checkEmail.message) {
  //   return res.status(statusCode.code.c409).json(checkEmail);
  // }

  const isUserValid = await usersServices
    .verifyValidation(displayName, email, password);
  console.log('const isNameValid line 14', isUserValid);
  if (isUserValid.message) {
    return res.status(statusCode.code.c400).json(isUserValid);
  }

  return res.status(statusCode.code.c201).json({ user: 'chegouuuuuu' });
});

module.exports = router;
