const Services = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await Services.createCategory(name);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};