const { user } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await user.create({ displayName, email, password, image });
    return res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error });
  }
};

module.exports = { createUser };