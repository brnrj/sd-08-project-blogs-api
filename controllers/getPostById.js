const Services = require('../services');

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Services.getPostById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPostById,
};