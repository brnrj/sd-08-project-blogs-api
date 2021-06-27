const express = require('express');
const usersServices = require('../services/usersServices');

const { validateDisplayName, validateEmail, emailRequired,
  validatePassword, validateEmailExists } = require('../middlewares/usersValidation');

const { status, message } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateDisplayName, emailRequired, validateEmail, 
validateEmailExists, validatePassword, async (req, res) => {
  try {
  const { displayName, email, password, image } = req.body;
  const createdUser = await usersServices.createUser(displayName, email, password, image);
  if (createdUser.isError) {
     return res.status(status.badRequest).json({ message: message.passwordSize });
  }
  return res.status(status.created).json({ token: createdUser });
  } catch (err) {
    console.log(err.message);
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
