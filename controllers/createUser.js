const Services = require('../services');

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const data = await Services.createUser(body);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};