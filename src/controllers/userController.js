// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: '../../config.env' });
const boom = require('@hapi/boom');
// const services = require('../services');
const userServices = require('../services/userServices');

const createsUser = async (req, res) => {
  console.log('Cruando usuario');
  const userInfos = req.body;
  const createdUser = await userServices.CreateUser(userInfos);
  const { error } = createdUser;
  if (error) {
    return boom.notFound(error.message);
  }
  console.log('Created', process.env.CREATED, createdUser);
  return res.status(Number(process.env.CREATED)).json(createdUser);
};

module.exports = createsUser;