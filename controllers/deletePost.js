const Services = require('../services');

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
    await Services.deletePost(id, authorization);
    return res.status(204).json();
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  deletePost,
};