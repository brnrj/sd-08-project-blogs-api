const { User } = require('../models');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });

    return res.status(201).json({ message: 'ok' });
  } catch (err) {
    if (err.errors[0].message === 'Users.email must be unique') {
      return res.status(409).json({ message: 'User already registered' });
    }
    res.status(400).json({ message: err.errors[0].message });
  }
};

const login = async (req, res) => {

};

module.exports = {
  newUser,
  login,
};
