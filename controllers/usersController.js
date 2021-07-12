const rescue = require('express-rescue');
const schema = require('../schema/usersSchema');
const { Users } = require('../models');
const errorClient = require('../utils/errorClient');

const STATUS_CREATE = 201;

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  
  const { error } = schema.usersCreate.validate({ displayName, email, password });
  if (error) return next(errorClient.badRequest(error.details[0].message));

  const foundEmailDb = await Users.findOne({ where: { email } });
  if (foundEmailDb) return next(errorClient.conflict('User already registered'));

  const result = await Users.create({ displayName, email, password, image });

  res.status(STATUS_CREATE).json(result);
});

module.exports = { createUser };