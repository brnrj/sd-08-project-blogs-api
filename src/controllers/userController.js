// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: '../../config' });
const boom = require('@hapi/boom');
// const services = require('../services');
const userServices = require('../services/userServices');
// const userServices = require('../../config');

const createsUser = async (req, res) => {
  console.log('Cruando usuario');
  const userInfos = req.body;
  const createdUser = await userServices.CreateUser(userInfos);
  const { error, isBoom } = createdUser;
  if (error) {
    return boom.notFound(error.message);
  }
  if (isBoom) {
    // console.log('Created', createdUser.output);
    const { statusCode } = createdUser.output;
    return res.status(statusCode).json({ message: 'User already registered' });
  }
  // console.log('Created', process.env.STATUS_CREATED, createdUser);
  return res.status(Number(process.env.STATUS_CREATED)).json(createdUser);
};

module.exports = createsUser;