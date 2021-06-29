const Services = require('../services');

const deleteUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    await Services.deleteUser(authorization);
    return res.status(204).json();
    } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteUser,
};