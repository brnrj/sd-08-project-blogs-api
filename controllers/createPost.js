const Services = require('../services');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  try {
    const data = await Services.createPost(body, authorization);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json(console.log({ message: error.message }));
  }
};

module.exports = {
  createPost,
};