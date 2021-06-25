const { Users } = require('../models');

const createNewUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await Users.create({ displayName, email, password, image });
    res.status(201).json(newUser);
  } catch (e) {
    if (e.errors[0].message.includes('unique')) {
      return next({
      status: 409,
      message: 'User already exists',
      });
    }
    next(e.message);
  }
};

module.exports = {
  createNewUser,
};