const Services = require('../services');

const searchPost = async (req, res) => {
  const { q } = req.query;
  try {
    const data = await Services.searchPost(q);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchPost,
};