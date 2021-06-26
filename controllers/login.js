const Services = require('../services');

const login = async (req, res) => {
  try {
    const { body } = req;
    const token = await Services.login(body);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
};