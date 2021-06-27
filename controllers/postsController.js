const { BlogPosts } = require('../models');

const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
  const bla = await BlogPosts.create({ title, content });
  res.status(200).json(bla);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addPost };