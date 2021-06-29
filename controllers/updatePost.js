const Services = require('../services');

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { authorization } = req.headers;
  try {
    const data = await Services.updatePost(id, body, authorization);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  updatePost,
};