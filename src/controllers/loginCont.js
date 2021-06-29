const express = require('express');
const loginServices = require('../services/loginServ');
const statusCode = require('../utils/statuscode');
// const { User } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // console.log('req.body login line 11', email, password);

  const isUserValid = await loginServices
    .verifyValidation(email, password);
  // console.log('const isNameValid line 14', isUserValid);
  if (isUserValid.message) {
    return res.status(statusCode.code.c400).json(isUserValid);
  }

  const checkLogin = await loginServices.checkLogin(email, password);
  // console.log('checkLogin', checkLogin);
  if (checkLogin.message) {
    return res.status(statusCode.code.c400).json(checkLogin);
  }

  return res.status(statusCode.code.c200).json({ token: checkLogin });
});

module.exports = router;
