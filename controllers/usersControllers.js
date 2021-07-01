const express = require('express');
const usersServices = require('../services/usersServices');

const { validateDisplayName, validateEmail, validatePassword, 
  validateEmailExists } = require('../middlewares/usersValidation');

const { validationToken } = require('../auth/validateJWT');

const { status, message } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateDisplayName, validateEmail, validatePassword,
validateEmailExists, async (req, res) => {
  try {
  const { displayName, email, password, image } = req.body;
  const user = await usersServices.createUser({ displayName, email, password, image });
  return res.status(status.created).json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

routes.get('/', validationToken, async (req, res) => {
  try {
    const user = await usersServices.findAllUsers();
    return res.status(status.OK).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

routes.get('/:id', validationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServices.findUserById(id);
    if (user.isError) return res.status(status.notFound).json({ message: message.userNotExist });
    return res.status(status.OK).json(user);
  } catch (err) {
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
