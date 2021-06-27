const express = require('express');

const { emailRequired, validatePassword, validateNotEmptyEmail,
  validateUserEmailExists } = require('../middlewares/usersValidation');

const { status } = require('../schema/status');
const { getToken } = require('../auth/validateJWT');

const routes = express.Router();

routes.post('/', emailRequired, validatePassword, validateNotEmptyEmail,
 validateUserEmailExists, async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await getToken(email, password);
    return res.status(status.OK).json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(status.badRequest).json({ message: 'Algo deu errado' });
  }
});

module.exports = routes;
