const { Router } = require('express');

const LoginController = Router();

const { User } = require('../models');

const { tokenCreate, validLogin } = require('../services');

const STATUS_400 = 400;
const STATUS_200 = 200;

LoginController.post('/', validLogin, tokenCreate, async (req, res) => {
  const { email } = req.body;
  // console.log('arquivo logincontroller - email', email);
  const token = req.userToken;
  // console.log('arquivo logincontroller - token', token);
  const userEmail = await User.findOne({ where: { email } });
  // console.log('arquivo logincontroller - userEmail', userEmail);
  if (!userEmail) { 
    return res.status(STATUS_400).json({ message: 'Invalid fields' });
  }  
  res.status(STATUS_200).json({ token }); 
});

module.exports = LoginController;
