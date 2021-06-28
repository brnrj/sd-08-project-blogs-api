const Services = require('../services');

const getPosts = async (_req, res) => {
  try {
    const data = await Services.getPosts();
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
};