const express = require('express');
const usersServices = require('../services/usersServices');

const { validateDisplayName, validateEmail,
  validatePassword } = require('../middlewares/usersValidation');

const { status } = require('../schema/status');

  const routes = express.Router();

routes.post('/', validateDisplayName, validateEmail, validatePassword, async (req, res) => {
  try {
  const { displayName, email, password, image } = req.body;
  const createdUser = await usersServices.createUser(displayName, email, password, image);
  return res.status(status.created).json({ token: createdUser });
  } catch (err) {
    console.log(err.message);
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
