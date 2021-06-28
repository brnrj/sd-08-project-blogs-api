const Services = require('../services');

const getCategories = async (_req, res) => {
  try {
    const data = await Services.getCategories();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
};