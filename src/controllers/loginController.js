// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: '../../config' });
// const boom = require('@hapi/boom');
const jwt = require('../auth/tokenGeneratis');
const services = require('../services');
// const services = require('../services');
// const userServices = require('../../config');

const loginUser = async (req, res) => {
  console.log('Logando Usuario');
  const { email, password } = req.body;
  const foundUser = await services.user.findByKey('email', email);

  if (foundUser && password === foundUser.password && email === foundUser.email) {
    const token = await jwt.tokenGenerete({ email, password });
    return res.status(Number(process.env.STATUS_OK)).json({ token });
  }

  return res.status(Number(process.env.STATUS_BAD_REQUEST)).json({ message: 'Invalid fields' });
};

module.exports = loginUser;