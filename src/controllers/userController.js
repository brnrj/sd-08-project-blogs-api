// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const boom = require('@hapi/boom');
const services = require('../services');

const createsUser = async (req, res) => {
  const userInfos = req.body;
  const createdUser = await services.CreateUser(userInfos);
  const { error } = createdUser;
  if (error) {
    return boom.notFound(error.message);
  }
  console.log('Created', createdUser);
  return res.status(process.env.CREATED).json(createdUser);
};

module.exports = createsUser;