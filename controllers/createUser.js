const user = require('../services');

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const data = await user.createUser(body);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};