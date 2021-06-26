const Services = require('../services');

const getUsers = async (req, res) => {
  try {
    const data = await Services.getUsers();
    return res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
};