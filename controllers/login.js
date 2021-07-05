const { Router } = require('express');

const LoginController = Router();

const { User } = require('../models');

const { tokenCreate, validLogin } = require('../services');

const STATUS_400 = 400;
const STATUS_200 = 200;

LoginController.post('/', validLogin, tokenCreate, async (req, res) => {
   const { email } = req.body;
  const { token } = req.header;
  // if (!email) res.status(STATUS_400).json({ message: '"email" is required' }); 
  // if (!password) res.status(STATUS_400).json({ message: '"password" is required' }); 
  // console.log(token);
  const userEmail = await User.findOne({ where: { email } });
  if (!userEmail) { 
    return res.status(STATUS_400).json({ message: 'Invalid fields' });
  }  
  res.status(STATUS_200).json({ token }); 
});

module.exports = LoginController;
