const Services = require('../services');

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Services.getUserById(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUserById,
};